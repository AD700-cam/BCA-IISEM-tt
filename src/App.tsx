import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Moon } from 'lucide-react';
import { QuoteDisplay } from './components/QuoteDisplay';
import { DaySchedule } from './components/DaySchedule';
import { timetableData, getCurrentDaySchedule } from './data/timetable';
import { FeedbackBox } from './components/FeedbackBox';
import { motion } from "framer-motion";

function App() {
  const currentDaySchedule = getCurrentDaySchedule();
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(today === 0 ? 5 : today - 1);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [showSundayMessage, setShowSundayMessage] = useState(today === 0 && sessionStorage.getItem('sundayMessageShown') !== 'true');
  const [showTimetable, setShowTimetable] = useState(today !== 0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (today === 0 && sessionStorage.getItem('sundayMessageShown') !== 'true') {
      sessionStorage.setItem('sundayMessageShown', 'true');
    }
  }, [today]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const closeSundayMessage = () => {
    setShowSundayMessage(false);
    setShowTimetable(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {showSundayMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-lg z-50"
        >
          <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg">
            No classes scheduled for today (Sunday). Enjoy your weekend!
          </p>
          <button
            onClick={closeSundayMessage}
            className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
          >
            OK
          </button>
        </motion.div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-100">
                BCA III SEM - Section D
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
          {showTimetable && (
            <DaySchedule
              schedule={timetableData[selectedDay]}
              isToday={today !== 0}
            />
          )}
          <FeedbackBox />
        </main>
      </div>
    </div>
  );
}

export default App;
