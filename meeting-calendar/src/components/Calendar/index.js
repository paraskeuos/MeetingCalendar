import { useState, useEffect } from 'react';
import MeetingTable from '../MeetingTable';
import Day from '../Day';
import AddMeetingModal from '../AddMeetingModal';

const Calendar = () => {
    const [monthName, setMonthName] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [calendar, setCalendar] = useState([]);
    const [participants, setParticipants] = useState([]);

    const [gapDays, setGapDays] = useState(0);
    const [gapDaysZero, setGapDaysZero] = useState(false);
    const [gapDaysNonZero, setGapDaysNonZero] = useState(false);
    
    useEffect(() => {
        fetch('http://localhost:4000/participants/')
        .then(res => res.json())
        .then(json => setParticipants(json));

        const date = new Date();
        setMonthName(date.toLocaleString('default', { month: 'long' }));
        setMonth(date.getMonth());
        setYear(1900 + date.getYear());

        date.setDate(1);
        const gapTmp = date.getDay();
        if(!gapTmp) {
            setGapDaysZero(true);
        } else {
            setGapDays(gapTmp);
            setGapDaysNonZero(true);
        }

        setDaysInMonth(getNumberOfDaysInMonth(month));
        
    }, []);
    
    useEffect(() => initCalendar(), 
        [daysInMonth, gapDays, gapDaysZero, gapDaysNonZero]);

    const initCalendar = () => {
        const gapDaysReady = gapDaysZero || gapDaysNonZero;
        if(!daysInMonth || !gapDaysReady) {
            return;
        }
        if(gapDaysNonZero && !gapDays) {
            return;
        }
        
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
        setCalendar(tmp);

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ month, year })
        };
        
        fetch('http://localhost:4000/meetings/', reqObj)
        .then(res => res.json())
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
            /*
            let i=1, j=0;
            while(i<=daysInMonth && j<json.length) {
                if(daysPerTableRow == 8) {
                    daysPerTableRow = 1;
                    tmp.push([]);
                }

                if(i < json[j].day) {
                    tmp[tmp.length-1].push({ day: i });
                    i++;
                } else {
                    
                    tmp[tmp.length-1].push({ day: i, meetings: []});
                    
                    while(j<json.length && i == json[j].day) {
                        tmp[tmp.length-1][daysPerTableRow-1].meetings.push(json[j]);
                        j++;
                    }
                }
                daysPerTableRow++;
            }*/
            setCalendar(tmp);
        });

    }

    const getNumberOfDaysInMonth = month => {
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

    return (
        <>
            <h1>{ monthName + ' ' + year }</h1>
            <p>Here are all your planned events. 
                You will find information for each event as well as plan a new one.
            </p>
            <table>
            <tbody>
                <tr>
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                </tr>
               {
                calendar.map((itemWeek, weekId) => {
                    return (
                        <tr key={weekId}>
                            {
                                itemWeek.map((item, itemId) => {
                                    return <Day key={itemId}
                                                dayIndex={item.day}
                                                meetings={item.meetings}
                                            />;
                                })
                            }
                        </tr>
                    );
                })
               }
            </tbody>
            </table>
            <AddMeetingModal />
        </>
    );
};

export default Calendar;