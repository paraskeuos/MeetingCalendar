import { useState, useEffect } from 'react';

const Calendar = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(0);
    
    useEffect(() => {
        const date = new Date();
        setMonth(date.toLocaleString('default', { month: 'long' }));
        setYear(1900 + date.getYear());
    }, []);

    return (
        <div>{ month + ' ' + year }</div>
    );
};

export default Calendar;