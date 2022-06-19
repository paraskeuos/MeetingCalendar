import { useState, useEffect } from 'react';

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
               {
                itemsPerWeek.map((itemWeek, weekId) => {
                    return (
                        <tr key={weekId}>
                            {
                                itemWeek.map((item, itemId) => {
                                    return <td key={itemId}>
                                        {item.day > 0 ? item.day : ""}
                                        </td>;
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