import {useNavigate} from 'react-router-dom';
import styles from './GameCard.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {GiChainedHeart} from 'react-icons/gi';
import {
    useDownVoteMutation,
    useGetGameVotesMutation,
    useGetMyVotesMutation,
    useUpVoteMutation,
} from '../../../api/gamesApi';
import {updateGameVotes, updateVotes} from '../../app/slice';

export default function GameCard(data) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gameVotes = useSelector((it) => it.state.gameVotes);
    const userId = useSelector((it) => it.state.user?.id);
    const votes = useSelector((it) => it.state.votes);
    const [upVote] = useUpVoteMutation();
    const [downVote] = useDownVoteMutation();
    const [getGameVotes] = useGetGameVotesMutation();
    const [getMyVotes] = useGetMyVotesMutation();

    function showDetails(event) {
        navigate(`/games/${event.target.value}`);
    }

    async function fetchMyVotes() {
        try {
            const response = await getMyVotes(userId);
            dispatch(updateVotes(response.data));
        } catch (error) {
            console.error(error);
        }
    }
    async function fetchGameVotes() {
        try {
            const response = await getGameVotes();
            dispatch(updateGameVotes(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUpvote(gameid) {
        await upVote({userid: userId, gameid});
        fetchMyVotes();
        fetchGameVotes();
    }

    async function handleDownvote(gameid) {
        await downVote({userid: userId, gameid});
        fetchMyVotes();
        fetchGameVotes();
    }

    function createCard() {
        let haveVoted = false;
        if (votes && votes.length > 0) {
            haveVoted = votes.find((it) => it.gameid === data.game.id) !== undefined;
        }
        const numberOfVotes = gameVotes.find((it) => it.gameid === data.game.id)?.votes;
        return (
            <>
                <div key={data.game.id} className={styles['game-card']}>
                    <h2>{data.game.name}</h2>
                    <img
                        width={320}
                        height={200}
                        src={new URL(`../../assets/images/${data.game.image}`, import.meta.url).href}
                    ></img>
                    <button value={data.game.id} onClick={(event) => showDetails(event)} className='show-details'>
                        Show Details
                    </button>
                    {numberOfVotes ? numberOfVotes : 0} Likes
                    {userId && (
                        <>
                            {haveVoted ? (
                                <button onClick={() => handleDownvote(data.game.id)}>
                                    <GiChainedHeart style={{color: 'blue'}} />
                                </button>
                            ) : (
                                <button onClick={() => handleUpvote(data.game.id)}>
                                    <GiChainedHeart />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }

    return <>{createCard()}</>;
}
