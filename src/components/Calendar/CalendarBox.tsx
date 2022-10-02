import { useState } from 'preact/hooks';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Time from './Time';

const CalendarBox = () => {
    const allMonthValues = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showTime, setShowTime] = useState<boolean>(false) 
    const [calendarText, setCalendarText] = useState(`No Date is selected`);

    const handleDateChange = (value: Date) => {
      setSelectedDate(value);
      setCalendarText(`The selected Date is ${value.toDateString()}`);
    };
  
    const handleYearChange = (value: Date) => {
      const yearValue = value.getFullYear();
      setCalendarText(`${yearValue} Year  is selected`);
    };
  
    const handleMonthChange = (value: Date) => {
      const monthValue = allMonthValues[value.getMonth()];
      setCalendarText(`${monthValue} Month  is selected`);
    };

  return (
    <div>
      <p className="calander-details">{calendarText}</p>
      <Calendar 
          locale="ja-JP"
          value={selectedDate}
          onChange={handleDateChange}
          onClickYear={handleYearChange}
          onClickMonth={handleMonthChange}
          onClickDay={() => setShowTime(true)}
          // selectRange={true}
      />
       <Time showTime={showTime} date={selectedDate}/>
    </div>
  )
}

export default CalendarBox