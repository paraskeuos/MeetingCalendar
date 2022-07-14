import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Day from '../Day';

const MeetingTable = ({calendar, openModal}) => {
    const [dayNames, setDayNames] = useState([]);

    useEffect(() => {
        const tmp = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        setDayNames(tmp);
    }, []);

    return (
        <table className={styles.table}>
            <tbody>
                <tr>
                    { dayNames.map((day, dayId) => 
                    <th key={dayId} className={styles.element}>{day}</th>)}
                </tr>
               {
                calendar?.map((itemWeek, weekId) => {
                    return (
                        <tr key={weekId}>
                            {
                                itemWeek.map((item, itemId) => {
                                    return <Day key={itemId}
                                                dayIndex={item.day}
                                                meetings={item.meetings}
                                                onDoubleClick={() => openModal(item.day)}
                                            />;
                                })
                            }
                        </tr>
                    );
                })
               }
            </tbody>
        </table>
    );
};

export default MeetingTable;