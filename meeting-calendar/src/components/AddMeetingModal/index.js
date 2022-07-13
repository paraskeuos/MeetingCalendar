import styles from './addmeeting.module.css';
import { useState, useEffect } from 'react';

const AddMeetingModal = ({ day, month, year, participants, closeModal }) => {
    const [meetingInfo, setMeetingInfo] = useState({});

    useEffect(() => {
        setMeetingInfo({ day, month, year });
    }, []);

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

                    const reqObj = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({...meetingInfo})
                    };
                    
                    fetch('http://localhost:4000/meetings/add', reqObj)
                    .then(res => res.json())
                    .then(json => closeModal(true));

                    e.preventDefault();
                }}>
                    <div className={styles.inputdiv}>
                        <label className={styles.inputdivelement}>Title:</label>
                        <input type="text"
                               name="name"
                               className={styles.inputdivelement}
                               onChange={(e) => handleChange(e)}
                               required />
                    </div>
                    <div className={styles.inputdiv}>
                        <label className={styles.inputdivelement}>Description:</label>
                        <textarea type="text"
                                  name="description"
                                  className={styles.inputdivelement}
                                  onChange={(e) => handleChange(e)}
                                  required />
                    </div>
                    <div className={styles.inputdiv}>
                        <label className={styles.inputdivelement}>Time:</label>
                        <input type="text"
                               name="time"
                               className={styles.inputdivelement}
                               onChange={(e) => handleChange(e)}
                               required />
                    </div>
                    <div className={styles.inputdiv}>
                        <label className={styles.inputdivelement}>Participants:</label>
                        <select size="4"
                                name="attendees"
                                className={styles.inputdivelement}
                                onChange={(e) => handleChange(e)}
                                multiple
                                required >
                            { participants?.map((participant, partId) => 
                                <option key={partId}>{participant.name}</option>) }
                        </select>
                    </div>
                    <div className={styles.buttondiv}>
                        <button type="submit" className={styles.button}>SAVE</button>
                        <button type="button"
                                className={styles.button}
                                onClick={() => closeModal(false)}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeetingModal;