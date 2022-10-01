import { useState } from 'preact/hooks';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarBox = () => {
    const [date, setDate] = useState(new Date())

  return (
    <Calendar 
        locale="ja-JP"
        value={date}
        onChange={setDate}
    />
  )
}

export default CalendarBox