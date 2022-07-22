import { useState, useEffect } from 'react';
import styles from './calendar.module.css';
import MeetingTable from '../MeetingTable';
import Header from '../Header';
import AddMeetingModal from '../AddMeetingModal';

const Calendar = () => {
    const [monthName, setMonthName] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const [gapDays, setGapDays] = useState(0);
    const [daysInMonth, setDaysInMonth] = useState(0);

    const [calendar, setCalendar] = useState([]);
    const [participants, setParticipants] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [chosenDay, setChosenDay] = useState(0);

    useEffect(() => {
        fetch('http://localhost:4000/participants/')
        .then(res => res.json())
        .then(json => setParticipants(json));

        const date = new Date();
        setMonthName(date.toLocaleString('default', { month: 'long' }));
        
        const month = date.getMonth();
        setMonth(month);
        const year = 1900 + date.getYear();
        setYear(year);

        date.setDate(1);
        const gapDays = date.getDay();
        setGapDays(gapDays);

        const daysInMonth = getNumberOfDaysInMonth(month, year);
        setDaysInMonth(daysInMonth);

        initCalendar(gapDays, daysInMonth);
        
    }, []);

    const initCalendar = (gapDays, daysInMonth) => {
        
        const tmp = [[]];
        let daysPerTableRow = 1;
        for(let i=0; i<gapDays; i++) {
            tmp[0].push({ day: 0 });
            daysPerTableRow++;
        }
        for(let i=1; i<=daysInMonth; i++) {
            if(daysPerTableRow == 8) {
                daysPerTableRow = 1;
                tmp.push([]);
            }
            tmp[tmp.length-1].push({ day: i });
            daysPerTableRow++;
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ month, year })
        };
        
        fetch('http://localhost:4000/meetings/', reqObj)
        .then(res => res.json(), () => setCalendar(tmp))
        .then(json => {
            let i = 0;
            while(i<json.length) {
                const meetingDay = json[i].day;
                // Find week of the meeting
                for(let j=0; ; j++) {
                    if(meetingDay > tmp[j][6].day) {
                        continue;
                    }
                    
                    // Find day in week of the meeting
                    for(let k=0; k<7; k++) {
                        if(tmp[j][k].day < meetingDay) {
                            continue;
                        }
                        
                        tmp[j][k].meetings = []
                        // Add all meetings of the same day
                        while(i<json.length && meetingDay === json[i].day) {
                            tmp[j][k].meetings.push(json[i]);
                            i++;
                        }
                        break;
                    }
                    break;
                }
            }
            setCalendar(tmp);
        });

    }

    const getNumberOfDaysInMonth = (month, year) => {
        switch(month) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                return 31;
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
                return leapYear ? 29 : 28;
            default:
                return 30;     
        }
    }

    useEffect(() => {
        if(!chosenDay) {
            return;
        }

        setShowModal(true);

    }, [chosenDay])

    const closeModal = (addedMeeting) => {
        setChosenDay(0);
        setShowModal(false);

        if(addedMeeting) {
            initCalendar(gapDays, daysInMonth);
        }
    };

    return (
        <div className={styles.overlay}>
            <Header monthName={monthName} year={year}/>
            <MeetingTable calendar={calendar} openModal={setChosenDay} />
            
            { showModal && 
                <AddMeetingModal day={chosenDay}
                                 month={month}
                                 year={year}
                                 participants={participants}
                                 closeModal={closeModal}/> }
        </div>
    );
};

export default Calendar;