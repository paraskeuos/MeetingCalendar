import { useState, useEffect } from 'react';
import Link from 'next/link';

const Day = ({ dayIndex, meetings }) => {

    return (
        <td>
        <p>{ dayIndex == 0 ? "" : dayIndex }</p>
        {
            meetings.map((meeting, meetKey) => (
                <Link key={meetKey} href={`/sastanak/${meeting.meetId}`}>
                    <p  href={`/sastanak/${meeting.meetId}`}>
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