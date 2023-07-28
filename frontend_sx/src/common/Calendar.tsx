import React, { useState } from "react";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';

const CalendarComp: React.FC<{}> = ({ }) => {
    const [selectedDay, setSelectedDay] = useState(null);

    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref} // necessary
            placeholder="I'm a custom input"
            value={selectedDay ? `✅: ${selectedDay.day}` : ''}
            
        />
    )

    return (
        <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            shouldHighlightWeekends
            renderInput={renderCustomInput}
        />
    )

}

export default Calendar;