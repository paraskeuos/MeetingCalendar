import styles from './addmeeting.module.css';
import { useState } from 'react';

const AddMeetingModal = ({ participants }) => {
    const [meetingInfo, setMeetingInfo] = useState({});

    const handleChange = (e) => {
        const newInfo = {...meetingInfo};
        if(e.target.name === 'attendees') {
            const options = e.target.options;
            newInfo.participants = [];
            for(let i=0; i<options.length; i++) {
                if(options[i].selected) {
                    newInfo.participants.push(options[i].value);
                }
            }
        } else {
            newInfo[e.target.name] = e.target.value;
        }
        setMeetingInfo(newInfo);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <form onSubmit={(e) => {
                    console.log(meetingInfo);
                    e.preventDefault();
                }}>
                    <div className={styles.input}>
                        <label>Title:</label>
                        <input type="text"
                               name="title"
                               onChange={(e) => handleChange(e)}
                               required />
                    </div>
                    <div className={styles.input}>
                        <label>Description:</label>
                        <textarea type="text"
                                  name="description"
                                  onChange={(e) => handleChange(e)}
                                  required />
                    </div>
                    <div className={styles.input}>
                        <label>Time:</label>
                        <input type="text"
                               name="time"
                               onChange={(e) => handleChange(e)}
                               required />
                    </div>
                    <div className={styles.input}>
                        <label>Participants:</label>
                        <select size="5"
                                name="attendees"
                                onChange={(e) => handleChange(e)}
                                multiple
                                required >
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