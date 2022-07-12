import Link from 'next/link';
import useRouter from 'next/router';

const MeetingInfo = () => {
    const router = useRouter.useRouter();

    return (
        <>
        <p>{ router.query.name }</p>
        <p>{ router.query.time }</p>
        <p>{ router.query.description }</p>
        <ul>
            Participants:
            { router.query.participants.split(',').map(
                (participant, pId) => (<li key={pId}>{participant}</li>)
                
            )}
        </ul>
        <button onClick={() => {
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
        }}>Remove meeting</button>
        <Link href="/">
            <a>Back</a>
        </Link>
        </>
    );
};

export default MeetingInfo;