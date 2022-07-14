import Link from 'next/link';
import styles from './day.module.css';

const Day = ({ dayIndex, meetings, onDoubleClick }) => {

    return (
        <td className={styles.td} onDoubleClick={onDoubleClick}>
        <p>{ dayIndex == 0 ? "" : dayIndex }</p>
        {
            meetings?.map((meeting, meetKey) => (
                <Link key={meetKey} 
                      href={{
                        pathname: `/sastanak/${meeting._id}`,
                        query: {...meeting,
                                participants: meeting.participants
                                                .map(part => part.name)
                                                .join(',')} }}>
                    <p>
                    {meeting.name}
                    <br/>
                    {meeting.description}
                    <br/>
                    {meeting.time}
                    </p>
                </Link>
            ))
        }
        </td>
    );
};

export default Day;