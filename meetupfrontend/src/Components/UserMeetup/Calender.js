import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function GroupCalendar() {
  const [value, onChange] = useState(new Date());
  const selectDate = () => {
    onChange(value);
  };
  return (
    <div>
      <Calendar onChange={selectDate} value={value} minDate={new Date()} />
    </div>
  );
}
