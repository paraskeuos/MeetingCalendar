import { useState, useEffect } from 'react';
import { Day } from '../components/Day';

const MeetingTable = ({month, itemsPerWeek}) => {

    return (
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
               {itemsPerWeek.length ?
                itemsPerWeek.map((itemWeek, weekId) => {
                    return (
                        <tr key={weekId}>
                            {
                                itemWeek.map((item, itemId) => {
                                    return (
                                        <td key={itemId} >
                                            <Day
                                                dayIndex={item.day}
                                            />
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    );
                }) : ""
               }
            </tbody>
        </table>
    );
};

export default MeetingTable;