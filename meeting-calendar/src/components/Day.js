import { useState, useEffect } from 'react';

const Day = ({ dayIndex }) => {
    return (
        <p>{ dayIndex == 0 ? "" : dayIndex }</p>
    );
};

export default Day;