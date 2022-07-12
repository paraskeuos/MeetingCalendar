import { useState, useEffect } from 'react';
import Link from 'next/link';

const Day = ({ dayIndex, meetings }) => {

    return (
        <td>
        <p>{ dayIndex == 0 ? "" : dayIndex }</p>
        {
            meetings?.map((meeting, meetKey) => (
                <Link key={meetKey} 
                      href={{
                        pathname: `/sastanak/${meeting.meetId}`,
                        query: meeting }}>
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