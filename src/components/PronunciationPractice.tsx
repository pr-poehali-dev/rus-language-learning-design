import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Word {
  russian: string;
  transcription: string;
  english: string;
  category: string;
}

const words: Word[] = [
  { russian: 'Здравствуйте', transcription: '[zdrast-vuy-tye]', english: 'Hello (formal)', category: 'Приветствия' },
  { russian: 'Спасибо', transcription: '[spa-see-ba]', english: 'Thank you', category: 'Вежливость' },
  { russian: 'Пожалуйста', transcription: '[pa-zhal-sta]', english: 'Please / You\'re welcome', category: 'Вежливость' },
  { russian: 'До свидания', transcription: '[da svi-da-ni-ya]', english: 'Goodbye', category: 'Приветствия' },
  { russian: 'Извините', transcription: '[iz-vi-nee-tye]', english: 'Excuse me / Sorry', category: 'Вежливость' },
  { russian: 'Хорошо', transcription: '[ha-ra-sho]', english: 'Good / Okay', category: 'Базовые' },
  { russian: 'Да', transcription: '[da]', english: 'Yes', category: 'Базовые' },
  { russian: 'Нет', transcription: '[nyet]', english: 'No', category: 'Базовые' },
  { russian: 'Как дела?', transcription: '[kak de-la]', english: 'How are you?', category: 'Фразы' },
  { russian: 'Понятно', transcription: '[pa-nyat-na]', english: 'Understood', category: 'Базовые' },
  { russian: 'Красиво', transcription: '[kra-see-va]', english: 'Beautiful', category: 'Прилагательные' },
  { russian: 'Большой', transcription: '[bal-shoy]', english: 'Big', category: 'Прилагательные' },
  { russian: 'Маленький', transcription: '[ma-lyn-kiy]', english: 'Small', category: 'Прилагательные' },
  { russian: 'Вкусно', transcription: '[fkus-na]', english: 'Tasty', category: 'Еда' },
  { russian: 'Любовь', transcription: '[lyu-bof]', english: 'Love', category: 'Эмоции' }
];

const PronunciationPractice = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const { toast } = useToast();

  const categories = ['Все', ...Array.from(new Set(words.map(w => w.category)))];
  
  const filteredWords = selectedCategory === 'Все' 
    ? words 
    : words.filter(w => w.category === selectedCategory);

  const currentWord = filteredWords[currentWordIndex];

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
      toast({
        title: 'Озвучка недоступна',
        description: 'Ваш браузер не поддерживает синтез речи',
        variant: 'destructive'
      });
    }
  }, [toast]);

  const speakWord = (text: string) => {
    if (!speechSupported) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      toast({
        title: 'Ошибка озвучки',
        description: 'Не удалось воспроизвести слово',
        variant: 'destructive'
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      setCurrentWordIndex(filteredWords.length - 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentWordIndex(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={selectedCategory === category 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'border-purple-300 text-purple-700 hover:bg-purple-50'}
          >
            {category}
          </Button>
        ))}
      </div>

      <Card className="shadow-2xl border-2 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">{currentWord.category}</p>
              <p className="text-sm opacity-90">
                {currentWordIndex + 1} из {filteredWords.length}
              </p>
            </div>
            <div className="flex gap-2">
              {filteredWords.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentWordIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <CardContent className="p-12 text-center space-y-8">
          <div className="space-y-6">
            <div 
              className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => speakWord(currentWord.russian)}
            >
              {currentWord.russian}
            </div>
            
            <div className="text-2xl text-gray-600 font-mono">
              {currentWord.transcription}
            </div>

            <div className="text-xl text-gray-500">
              {currentWord.english}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => speakWord(currentWord.russian)}
              disabled={!speechSupported}
              size="lg"
              className={`w-20 h-20 rounded-full shadow-xl transition-all ${
                isPlaying 
                  ? 'bg-pink-600 hover:bg-pink-700 scale-110' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <Icon name="Volume2" size={32} className="text-white" />
              )}
            </Button>
            
            <p className="text-sm text-gray-500">
              {speechSupported ? 'Нажмите, чтобы услышать произношение' : 'Озвучка недоступна'}
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button
              onClick={handlePrevious}
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <Icon name="ChevronLeft" size={24} />
              Назад
            </Button>
            
            <Button
              onClick={() => speakWord(currentWord.russian)}
              disabled={!speechSupported}
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Повторить
            </Button>

            <Button
              onClick={handleNext}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Далее
              <Icon name="ChevronRight" size={24} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: 'Ear', title: 'Слушайте', desc: 'Естественное произношение' },
          { icon: 'Repeat', title: 'Повторяйте', desc: 'Тренируйте произношение' },
          { icon: 'Check', title: 'Учитесь', desc: 'Запоминайте правильно' }
        ].map((tip, index) => (
          <Card key={index} className="border-2 hover:border-purple-300 transition-all">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name={tip.icon} size={28} className="text-purple-600" />
              </div>
              <h4 className="font-bold text-lg">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PronunciationPractice;
