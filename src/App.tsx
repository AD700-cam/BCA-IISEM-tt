import { useState, useEffect } from 'react';
import { Calendar, Sun, Moon } from 'lucide-react';
import { QuoteDisplay } from './components/QuoteDisplay';
import { DaySchedule } from './components/DaySchedule';
import { timetableData } from './data/timetable';
import { FeedbackBox } from './components/FeedbackBox';
import { Footer } from './components/Footer';
import { motion } from "framer-motion";
import clsx from 'clsx';

function App() {
  const now = new Date();
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const today = nowIST.getDay();
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
    <div className="min-h-screen relative overflow-hidden flex flex-col transition-colors duration-700">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 bg-mesh opacity-30 dark:opacity-50" />
      <div className="fixed inset-0 z-0 cursor-default pointer-events-none">
        <div className={clsx(
          "absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[128px] animate-float transition-colors duration-1000",
          isDarkMode ? "bg-blue-500/10" : "bg-blue-400/20"
        )} />
        <div className={clsx(
          "absolute top-3/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[128px] animate-float transition-colors duration-1000",
          isDarkMode ? "bg-purple-500/10" : "bg-purple-400/20"
        )} style={{ animationDelay: '-3s' }} />
        <div className={clsx(
          "absolute top-1/2 left-3/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-float transition-colors duration-1000",
          isDarkMode ? "bg-emerald-500/5" : "bg-emerald-400/20"
        )} style={{ animationDelay: '-1.5s' }} />
      </div>

      {showSundayMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-8 shadow-2xl z-50 text-center max-w-sm"
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sun className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-100 text-lg font-medium mb-6">
            No classes scheduled for today (Sunday). Enjoy your weekend!
          </p>
          <button
            onClick={closeSundayMessage}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-blue-600/20 rounded-xl sm:rounded-2xl glass border-blue-500/20">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 leading-tight tracking-tight">
                  BCA III SEM
                </h1>
                <p className="text-gray-400 text-[0.7rem] sm:text-sm font-medium">Section D • Timetable</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass-card border-white/5 overflow-hidden group"
            >
              <motion.div
                initial={false}
                animate={{
                  y: isDarkMode ? 40 : 0,
                  opacity: isDarkMode ? 0 : 1,
                  rotate: isDarkMode ? 45 : 0
                }}
                className="relative z-10"
              >
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  y: isDarkMode ? 0 : -40,
                  opacity: isDarkMode ? 1 : 0,
                  rotate: isDarkMode ? 0 : -45
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
          <QuoteDisplay />
        </header>

        <nav className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 relative">
          {timetableData.map((schedule, index) => {
            const isSelected = selectedDay === index;
            return (
              <button
                key={schedule.day}
                onClick={() => setSelectedDay(index)}
                className={clsx(
                  "relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[0.85rem] sm:text-sm font-semibold whitespace-nowrap transition-colors duration-500",
                  isSelected ? "text-white" : "text-gray-400 hover:text-gray-200"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeDayPill"
                    className="absolute inset-0 bg-blue-600 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-900/40 border border-blue-400"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {!isSelected && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl glass-card border flex items-center justify-center -z-10 border-white/5 opacity-50" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {schedule.day}
                  {index === today - 1 && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full inline-block animate-pulse" />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        <main className="flex-1 min-h-0 flex flex-col">
          {showTimetable && (
            <div className="flex-1 overflow-y-auto scrollbar-hide pr-1 sm:pr-2">
              <DaySchedule
                schedule={timetableData[selectedDay]}
                isToday={today !== 0 && selectedDay === (today === 0 ? 5 : today - 1)}
              />
            </div>
          )}
          <div className="mt-6 sm:mt-8">
            <FeedbackBox />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
