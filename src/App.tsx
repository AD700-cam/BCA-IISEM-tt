import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Moon } from 'lucide-react';
import { QuoteDisplay } from './components/QuoteDisplay';
import { DaySchedule } from './components/DaySchedule';
import { timetableData, getCurrentDaySchedule } from './data/timetable';

function App() {
  const currentDaySchedule = getCurrentDaySchedule();
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(today - 1);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-100">
                BCA II SEM - Section D
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
          <QuoteDisplay />
        </header>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {timetableData.map((schedule, index) => (
            <button
              key={schedule.day}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedDay === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {schedule.day}
              {index === today - 1 && (
                <span className="ml-2 text-xs opacity-75">(Today)</span>
              )}
            </button>
          ))}
        </div>

        <main className="h-[calc(100vh-280px)] overflow-y-auto">
          <DaySchedule
            schedule={timetableData[selectedDay]}
            isToday={selectedDay === today - 1}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
