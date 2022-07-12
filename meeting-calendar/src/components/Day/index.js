import Link from 'next/link';

const Day = ({ dayIndex, meetings, onDoubleClick }) => {

    return (
        <td onDoubleClick={onDoubleClick}>
        <p>{ dayIndex == 0 ? "" : dayIndex }</p>
        {
            meetings?.map((meeting, meetKey) => (
                <Link key={meetKey} 
                      href={{
                        pathname: `/sastanak/${meeting.meetId}`,
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