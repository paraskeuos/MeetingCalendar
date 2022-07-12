import styles from './addmeeting.module.css';
import { useRef } from 'react';

const AddMeetingModal = ({ participants }) => {
    const title = useRef();
    const desc = useRef();
    const time = useRef();
    const attendees = useRef();

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <form onSubmit={(e) => {
                    const multipleSelect = e.target[3].options;
                    const selectedAttendees = [];
                    for(let i=0; i<multipleSelect.length; i++) {
                        if(multipleSelect[i].selected) {
                            selectedAttendees.push(multipleSelect[i].text);
                        }
                    }

                    const meetingInfo = {
                        title: title.current.value,
                        description: desc.current.value,
                        time: time.current.value,
                        participants: selectedAttendees
                    };
                    console.log(meetingInfo);
                    e.preventDefault();
                }}>
                    <div className={styles.input}>
                        <label>Title:</label>
                        <input type="text" required ref={title}/>
                    </div>
                    <div className={styles.input}>
                        <label>Description:</label>
                        <textarea type="text" required ref={desc}/>
                    </div>
                    <div className={styles.input}>
                        <label>Time:</label>
                        <input type="text" required ref={time}/>
                    </div>
                    <div className={styles.input}>
                        <label>Participants:</label>
                        <select size="5" multiple required ref={attendees}>
                            { participants?.map((participant, partId) => 
                                <option key={partId}>{participant.name}</option>) }
                        </select>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddMeetingModal;