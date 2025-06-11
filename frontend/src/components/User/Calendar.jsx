import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDay = currentDate.startOf('month').startOf('week');
  const endDay = currentDate.endOf('month').endOf('week');

  const generateCalendar = () => {
    let date = startDay.clone(); // FIXED: let instead of const
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        week.push(date.clone());
        date = date.add(1, 'day');
      }

      calendar.push(week);
    }

    return calendar;
  };

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const calendar = generateCalendar();

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-blue-600 text-lg font-bold">
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button onClick={handleNextMonth} className="text-blue-600 text-lg font-bold">
          &gt;
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-600">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {calendar.map((week, i) =>
          week.map((day, j) => (
            <div
              key={`${i}-${j}`}
              className={`p-2 rounded text-sm text-center ${day.month() === currentDate.month()
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-400'
                }`}
            >
              {day.date()}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
