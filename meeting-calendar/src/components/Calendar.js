import { useState, useEffect } from 'react';
import MeetingTable from './MeetingTable';

const Calendar = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(0);
    
    useEffect(() => {
        const date = new Date();
        setMonth(date.toLocaleString('default', { month: 'long' }));
        setYear(1900 + date.getYear());
    }, []);

    return (
        <>
            <h1>{ month + ' ' + year }</h1>
            <p>Here are all your planned events. 
                You will find information for each event as well as plan a new one.
            </p>
            <MeetingTable />
        </>
    );
};

export default Calendar;