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
            { router.query.participants.map(
                (participant, pId) => (<li key={pId}>{participant}</li>)
                
            )}
        </ul>
        <Link href="/">
            <a>Back</a>
        </Link>
        </>
    );
};

export default MeetingInfo;