import Day from '../Day';

const MeetingTable = ({calendar, openModal}) => {

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