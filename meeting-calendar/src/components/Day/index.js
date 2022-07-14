import Link from 'next/link';
import styles from './day.module.css';

const Day = ({ dayIndex, meetings, onDoubleClick }) => {

    return (
        <td className={styles.td} onDoubleClick={onDoubleClick}>
        <h3 className={styles.dayNum}>{ dayIndex == 0 ? "" : dayIndex }</h3>
        {
            meetings?.map((meeting, meetKey) => (
                <Link key={meetKey} 
                      href={{
                        pathname: `/sastanak/${meeting._id}`,
                        query: {...meeting,
                                participants: meeting.participants
                                                .map(part => part.name)
                                                .join(',')} }}>
                    <div className={styles.event}>
                        <p className={styles.eventname}>{meeting.name}</p>
                        <p className={styles.eventtime}>{meeting.time}</p>
                    </div>
                </Link>
            ))
        }
        </td>
    );
};

export default Day;