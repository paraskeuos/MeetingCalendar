import styles from './addmeeting.module.css';

const AddMeetingModal = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>Modal</div>
        </div>
    );
};

export default AddMeetingModal;