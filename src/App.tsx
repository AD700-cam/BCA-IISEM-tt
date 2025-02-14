import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { QuoteDisplay } from './components/QuoteDisplay';
import { DaySchedule } from './components/DaySchedule';
import { timetableData, getCurrentDaySchedule } from './data/timetable';

function App() {
  const currentDaySchedule = getCurrentDaySchedule();
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(today - 1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-100">
              BCA II SEM - Section D
            </h1>
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
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
