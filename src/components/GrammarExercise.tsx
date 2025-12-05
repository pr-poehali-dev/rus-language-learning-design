import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Выберите правильный падеж: "Я иду в ___" (магазин)',
    options: ['магазин', 'магазина', 'магазину', 'магазином'],
    correctAnswer: 0,
    explanation: 'Винительный падеж для направления движения: в + винительный падеж'
  },
  {
    id: 2,
    question: 'Какое окончание у глагола "читать" в 1-м лице ед. числа?',
    options: ['читаешь', 'читаю', 'читает', 'читаем'],
    correctAnswer: 1,
    explanation: 'Глагол I спряжения: я читаю'
  },
  {
    id: 3,
    question: 'Выберите правильную форму: "У меня есть ___" (книга)',
    options: ['книгу', 'книге', 'книга', 'книги'],
    correctAnswer: 2,
    explanation: 'Именительный падеж после "есть": у меня есть книга'
  },
  {
    id: 4,
    question: 'Какое местоимение правильное: "___ читаешь книгу"',
    options: ['Я', 'Ты', 'Он', 'Мы'],
    correctAnswer: 1,
    explanation: 'Форма глагола "читаешь" соответствует местоимению "ты"'
  },
  {
    id: 5,
    question: 'Выберите множественное число: "стол"',
    options: ['столы', 'столи', 'столов', 'столе'],
    correctAnswer: 0,
    explanation: 'Множественное число существительного мужского рода: столы'
  }
];

const GrammarExercise = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFinished = isLastQuestion && showResult;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-2xl border-2">
        <CardContent className="p-8">
          {!isFinished ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-red-600">{currentQuestion + 1}</span>
                  </div>
                  <span className="text-gray-600">из {questions.length}</span>
                </div>
                <div className="flex gap-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        answeredQuestions.includes(index)
                          ? 'bg-green-500'
                          : index === currentQuestion
                          ? 'bg-red-600 w-6'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3 mb-6">
                {questions[currentQuestion].options.map((option, index) => {
                  let buttonClass = 'w-full text-left p-4 rounded-xl border-2 transition-all font-semibold';
                  
                  if (showResult) {
                    if (index === questions[currentQuestion].correctAnswer) {
                      buttonClass += ' bg-green-50 border-green-500 text-green-800';
                    } else if (index === selectedAnswer) {
                      buttonClass += ' bg-red-50 border-red-500 text-red-800';
                    } else {
                      buttonClass += ' border-gray-200 text-gray-400';
                    }
                  } else {
                    if (index === selectedAnswer) {
                      buttonClass += ' bg-red-50 border-red-500 text-red-800';
                    } else {
                      buttonClass += ' border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-800';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          showResult && index === questions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : showResult && index === selectedAnswer
                            ? 'border-red-500 bg-red-500'
                            : index === selectedAnswer
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300'
                        }`}>
                          {showResult && index === questions[currentQuestion].correctAnswer && (
                            <Icon name="Check" size={18} className="text-white" />
                          )}
                          {showResult && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                            <Icon name="X" size={18} className="text-white" />
                          )}
                          {!showResult && index === selectedAnswer && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`p-4 rounded-xl mb-6 ${
                  isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      <Icon name={isCorrect ? 'Check' : 'X'} size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Правильно! 🎉' : 'Неправильно'}
                      </h4>
                      <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!showResult ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg"
                    size="lg"
                  >
                    Проверить ответ
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg"
                    size="lg"
                  >
                    {isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'}
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Trophy" size={48} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold">Тест завершён!</h3>
              <div className="text-6xl font-bold text-red-600">
                {score}/{questions.length}
              </div>
              <p className="text-xl text-gray-600">
                {score === questions.length
                  ? 'Отлично! Вы ответили правильно на все вопросы! 🎉'
                  : score >= questions.length * 0.7
                  ? 'Хорошая работа! Продолжайте практиковаться! 👍'
                  : 'Продолжайте учиться! У вас всё получится! 💪'}
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={handleRestart}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8"
                >
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Пройти ещё раз
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrammarExercise;
