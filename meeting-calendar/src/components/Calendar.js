import { useState, useEffect } from 'react';
import MeetingTable from './MeetingTable';

const Calendar = () => {
    const [monthName, setMonthName] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [gapDays, setGapDays] = useState(0);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const date = new Date();
        setMonthName(date.toLocaleString('default', { month: 'long' }));
        setMonth(date.getMonth());
        setYear(1900 + date.getYear());

        date.setDate(1);
        setGapDays(date.getDay());

        switch(month) {
            case 0, 2, 4, 6, 7, 9, 11:
                setDaysInMonth(31);
                break;
            case 1:
                let leapYear = false;
                if (year % 4 == 0) {
                    if (year % 100 == 0) {
                      leapYear = year % 400 == 0 ? true : false;
                    }
                    else {
                      leapYear = true;
                    }
                }
                setDaysInMonth(leapYear ? 29 : 28);
                break;
            default:
                setDaysInMonth(30);
                break;          
        }

        const tmp = [[]];
        let daysPerTableRow = 1;
        for(let i=0; i<gapDays; i++) {
            tmp[0].push({ day: 0});
            daysPerTableRow++;
        }

        for(let i=0; i<daysInMonth; i++) {
            tmp[tmp.length-1].push({ day: i+1 });
            
            daysPerTableRow++;
            if(daysPerTableRow == 8) {
                daysPerTableRow = 1;
                if(i+1 < daysInMonth) {
                    tmp.push([]);
                }
            }
        }

        setItems(tmp);
    }, []);

    return (
        <>
            <h1>{ monthName + ' ' + year }</h1>
            <p>Here are all your planned events. 
                You will find information for each event as well as plan a new one.
            </p>
            <MeetingTable month={month} itemsPerWeek={items}/>
        </>
    );
};

export default Calendar;