import styles from './addmeeting.module.css';

const AddMeetingModal = ({ participants }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <form>
                    <div className={styles.input}>
                        <label>Title:</label>
                        <input type="text" />
                    </div>
                    <div className={styles.input}>
                        <label>Description:</label>
                        <textarea type="text" />
                    </div>
                    <div className={styles.input}>
                        <label>Time:</label>
                        <input type="text" />
                    </div>
                    <div className={styles.input}>
                        <label>Participants:</label>
                        <select size="5" multiple>
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