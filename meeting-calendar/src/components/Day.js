import { useState, useEffect } from 'react';

const Day = ({ dayIndex, meetings }) => {
    return (
        <>
        <p>{ dayIndex == 0 ? "" : dayIndex }</p>
        {
            meetings.map((meeting, meetKey) => (
                <p key={meetKey}>
                    {meeting.name}
                    <br/>
                    {meeting.time}
                </p>
            ))
        }
        </>
    );
};

export default Day;