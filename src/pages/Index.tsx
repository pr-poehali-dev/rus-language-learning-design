import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import GrammarExercise from '@/components/GrammarExercise';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const videos = [
    {
      title: 'Русские народные праздники',
      description: 'Узнайте о традиционных праздниках: Масленица, Пасха, Новый год',
      duration: '12 мин'
    },
    {
      title: 'История матрёшки',
      description: 'Откуда появилась матрёшка и что она символизирует в русской культуре',
      duration: '8 мин'
    },
    {
      title: 'Русская кухня',
      description: 'Традиционные блюда: борщ, пельмени, блины и другие',
      duration: '15 мин'
    },
    {
      title: 'Архитектура Москвы',
      description: 'Путешествие по историческим местам столицы России',
      duration: '20 мин'
    }
  ];

  const grammarTopics = [
    { icon: 'BookOpen', title: 'Алфавит', desc: 'Кириллица и произношение' },
    { icon: 'Type', title: 'Падежи', desc: '6 падежей русского языка' },
    { icon: 'MessageSquare', title: 'Глаголы', desc: 'Спряжение и виды глаголов' },
    { icon: 'Sparkles', title: 'Прилагательные', desc: 'Согласование и степени сравнения' }
  ];

  const vocabularyCategories = [
    { emoji: '🏠', title: 'Дом и семья', words: 120 },
    { emoji: '🍽️', title: 'Еда и напитки', words: 150 },
    { emoji: '🚗', title: 'Транспорт', words: 80 },
    { emoji: '👔', title: 'Одежда', words: 95 },
    { emoji: '🎨', title: 'Искусство', words: 110 },
    { emoji: '⚽', title: 'Спорт', words: 75 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🪆</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Русский Язык
              </h1>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'grammar', label: 'Грамматика' },
                { id: 'exercises', label: 'Упражнения' },
                { id: 'vocabulary', label: 'Словарь' },
                { id: 'culture', label: 'О культуре' },
                { id: 'videos', label: 'Видео-уроки' },
                { id: 'contact', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-semibold transition-all hover:text-red-600 ${
                    activeSection === item.id ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button className="md:hidden" variant="outline" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/40ee38a2-f9b0-4352-8762-8355504b734f/files/04474144-533f-4652-a3b7-5c8071f4cb76.jpg')`,
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block bg-gradient-to-r from-red-100 to-orange-100 px-6 py-2 rounded-full">
                <span className="text-red-700 font-semibold">🎓 Изучайте русский язык легко!</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Откройте мир
                <span className="block bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                  русской культуры
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Интерактивная платформа для изучения русского языка: грамматика, лексика, культура и традиции в одном месте
              </p>
              <div className="flex gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => scrollToSection('grammar')}
                >
                  Начать обучение
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold px-8"
                  onClick={() => scrollToSection('videos')}
                >
                  Смотреть видео
                  <Icon name="Play" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-3xl blur-3xl opacity-30" />
              <img
                src="https://cdn.poehali.dev/projects/40ee38a2-f9b0-4352-8762-8355504b734f/files/c6881649-7775-48e3-916e-344c1610b339.jpg"
                alt="Матрёшка и Кремль"
                className="relative rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="grammar" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Icon name="BookOpen" size={20} className="text-red-600" />
              <span className="text-red-700 font-semibold">Грамматика</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">Основы русской грамматики</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Изучайте правила русского языка структурированно и понятно
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {grammarTopics.map((topic, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-red-200"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center">
                    <Icon name={topic.icon} size={28} className="text-red-600" />
                  </div>
                  <h4 className="text-xl font-bold">{topic.title}</h4>
                  <p className="text-gray-600">{topic.desc}</p>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0">
                    Изучить
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="exercises" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
              <Icon name="Brain" size={20} className="text-purple-600" />
              <span className="text-purple-700 font-semibold">Упражнения</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">Проверьте свои знания</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Интерактивный тест по русской грамматике с мгновенной проверкой ответов
            </p>
          </div>
          <GrammarExercise />
        </div>
      </section>

      <section id="vocabulary" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <Icon name="BookMarked" size={20} className="text-blue-600" />
              <span className="text-blue-700 font-semibold">Словарь</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">Тематический словарь</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Более 600 слов по популярным темам с транскрипцией и примерами
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabularyCategories.map((category, index) => (
              <Card 
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur border-2 hover:border-blue-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{category.emoji}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-1">{category.title}</h4>
                      <p className="text-sm text-gray-600">{category.words} слов</p>
                    </div>
                    <Icon name="ChevronRight" size={24} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="culture" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 rounded-3xl blur-3xl opacity-30" />
              <img
                src="https://cdn.poehali.dev/projects/40ee38a2-f9b0-4352-8762-8355504b734f/files/d5eec14a-b5f6-461c-be5e-70482a2b2814.jpg"
                alt="Русская культура"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                <Icon name="Sparkles" size={20} className="text-orange-600" />
                <span className="text-orange-700 font-semibold">О культуре</span>
              </div>
              <h3 className="text-4xl font-bold">Погрузитесь в русскую культуру</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Изучение языка невозможно без понимания культуры. Узнайте о традициях, 
                праздниках, кухне, искусстве и истории России.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Star', title: 'Народные традиции', desc: 'От Масленицы до Рождества' },
                  { icon: 'Coffee', title: 'Русская кухня', desc: 'Борщ, пельмени, блины' },
                  { icon: 'Music', title: 'Искусство и музыка', desc: 'Балет, классика, народные песни' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={24} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold mt-4"
              >
                Узнать больше
                <Icon name="ExternalLink" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="videos" className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Icon name="Video" size={20} className="text-red-600" />
              <span className="text-red-700 font-semibold">Видео-уроки</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">Видео о русской культуре</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Смотрите увлекательные видео о традициях, истории и повседневной жизни России
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Card 
                key={index}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-red-100 to-orange-100 h-48 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 group-hover:scale-110 transition-transform duration-300" />
                    <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon name="Play" size={32} className="text-red-600 ml-1" />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold">{video.title}</h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {video.duration}
                      </span>
                    </div>
                    <p className="text-gray-600">{video.description}</p>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 mt-2">
                      Смотреть урок
                      <Icon name="PlayCircle" size={18} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                <Icon name="Mail" size={20} className="text-blue-600" />
                <span className="text-blue-700 font-semibold">Контакты</span>
              </div>
              <h3 className="text-4xl font-bold mb-4">Свяжитесь с нами</h3>
              <p className="text-gray-600 text-lg">
                Есть вопросы? Мы всегда рады помочь!
              </p>
            </div>
            <Card className="shadow-xl border-2">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: 'Mail', title: 'Email', info: 'info@russianlang.ru', color: 'blue' },
                    { icon: 'Phone', title: 'Телефон', info: '+7 (495) 123-45-67', color: 'red' },
                    { icon: 'MapPin', title: 'Адрес', info: 'Москва, Россия', color: 'orange' }
                  ].map((contact, index) => (
                    <div key={index} className="text-center space-y-3">
                      <div className={`w-16 h-16 bg-gradient-to-br from-${contact.color}-100 to-${contact.color}-200 rounded-full flex items-center justify-center mx-auto`}>
                        <Icon name={contact.icon} size={28} className={`text-${contact.color}-600`} />
                      </div>
                      <h4 className="font-bold text-lg">{contact.title}</h4>
                      <p className="text-gray-600">{contact.info}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🪆</div>
                <h4 className="text-xl font-bold">Русский Язык</h4>
              </div>
              <p className="text-red-100">
                Изучайте русский язык легко и интересно
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Обучение</h5>
              <ul className="space-y-2 text-red-100">
                <li className="hover:text-white cursor-pointer transition-colors">Грамматика</li>
                <li className="hover:text-white cursor-pointer transition-colors">Словарь</li>
                <li className="hover:text-white cursor-pointer transition-colors">Видео-уроки</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">О проекте</h5>
              <ul className="space-y-2 text-red-100">
                <li className="hover:text-white cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-white cursor-pointer transition-colors">Культура</li>
                <li className="hover:text-white cursor-pointer transition-colors">Блог</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Контакты</h5>
              <ul className="space-y-2 text-red-100">
                <li className="hover:text-white cursor-pointer transition-colors">Email</li>
                <li className="hover:text-white cursor-pointer transition-colors">Телефон</li>
                <li className="hover:text-white cursor-pointer transition-colors">Адрес</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-400 pt-8 text-center text-red-100">
            <p>© 2024 Русский Язык. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;