import styles from './addmeeting.module.css';

const AddMeetingModal = () => {
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
                            <option>Pera</option>
                            <option>Mika</option>
                            <option>Zika</option>
                        </select>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddMeetingModal;