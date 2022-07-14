import styles from './header.module.css'

const Header = ({ monthName, year }) => {
    return (
        <div className={styles.body}>
            <h1 className={styles.element}>{ monthName + ' ' + year }</h1>
            <p className={styles.element}>Here are all your planned events. 
                You will find information for each event as well as plan a new one.
            </p>
        </div>
    );
};

export default Header;