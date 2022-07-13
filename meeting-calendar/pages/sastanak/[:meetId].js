import Link from 'next/link';
import useRouter from 'next/router';
import styles from './sastanak.module.css'

const MeetingInfo = () => {
    const router = useRouter.useRouter();

    return (
        <div className={styles.body}>
        <h2 className={styles.item}>{ router.query.name }</h2>
        <p id={styles.time}>{ router.query.time }</p>
        <p>{ router.query.description }</p>
        <ul id={styles.list}>
            Participants:
            { router.query.participants.split(',').map(
                (participant, pId) => (<li key={pId}>{participant}</li>)
                
            )}
        </ul>
        
        <div className={styles.buttondiv}>
        <button className={styles.button} id={styles.remove} onClick={() => {
            const reqObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: router.query._id })
            };
            
            fetch('http://localhost:4000/meetings/', reqObj)
            .then(res => res.json())
            .then(json => router.push('/'));
        }}>DELETE</button>
        
        <Link href="/">
            <button className={styles.button}>Back</button>
        </Link>
        </div>
        </div>
    );
};

export default MeetingInfo;