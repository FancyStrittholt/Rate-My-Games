import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    useDownVoteMutation,
    useGetGameVotesMutation,
    useGetGamesMutation,
    useGetMyVotesMutation,
    useUpVoteMutation,
} from '../../../api/gamesApi';
import {updateGameVotes, updateGames, updateVotes} from '../../app/slice';
import styles from './Games.module.css';
import {GiChainedHeart} from 'react-icons/gi';

export default function Games() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((it) => it.state.user?.id);
    const votes = useSelector((it) => it.state.votes);
    const gameVotes = useSelector((it) => it.state.gameVotes);
    const games = useSelector((it) => it.state.games);
    const [search, setSearch] = useState('');
    const [filteredGames, setFilteredGames] = useState(games);

    const [getGames, {error, isLoading}] = useGetGamesMutation();
    const [getMyVotes] = useGetMyVotesMutation();
    const [upVote] = useUpVoteMutation();
    const [downVote] = useDownVoteMutation();
    const [getGameVotes] = useGetGameVotesMutation();

    useEffect(() => {
        fetchGames();
        fetchGameVotes();

        if (userId) {
            fetchMyVotes();
        }
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = games.filter(
                (it) =>
                    it.name.toLowerCase().includes(search.toLowerCase()) ||
                    it.developer.toLowerCase().includes(search.toLowerCase()) ||
                    it.publisher.toLowerCase().includes(search.toLocaleLowerCase())
            );
            if (filtered.length > 0) {
                setFilteredGames(filtered);
            } else {
                setFilteredGames([]);
            }
        } else {
            setFilteredGames(games);
        }
    }, [search]);

    useEffect(() => {
        if (!search && games && games.length > 0) {
            setFilteredGames(games);
        }
    }, [games]);

    function showDetails(event) {
        navigate(`/games/${event.target.value}`);
    }

    async function fetchGames() {
        try {
            const response = await getGames();
            dispatch(updateGames(response.data));
            setFilteredGames(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchMyVotes() {
        try {
            const response = await getMyVotes(userId);
            dispatch(updateVotes(response.data));
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

    async function fetchGameVotes() {
        try {
            const response = await getGameVotes();
            dispatch(updateGameVotes(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    function createGameCards() {
        const games = [];

        for (const game of filteredGames) {
            let haveVoted = false;
            if (votes && votes.length > 0) {
                haveVoted = votes.find((it) => it.gameid === game.id) !== undefined;
            }

            const numberOfVotes = gameVotes.find((it) => it.gameid === game.id)?.votes;

            games.push(
                <div key={game.id} className={styles['game-card']}>
                    <h2>{game.name}</h2>
                    <img
                        width={320}
                        height={200}
                        src={new URL(`../../assets/images/${game.image}`, import.meta.url).href}
                    ></img>
                    <button value={game.id} onClick={(event) => showDetails(event)} className='show-details'>
                        Show Details
                    </button>
                    {numberOfVotes ? numberOfVotes : 0} Likes
                    {userId && (
                        <>
                            {haveVoted ? (
                                <button onClick={() => handleDownvote(game.id)}>
                                    <GiChainedHeart style={{color: 'blue'}} />
                                </button>
                            ) : (
                                <button onClick={() => handleUpvote(game.id)}>
                                    <GiChainedHeart />
                                </button>
                            )}
                        </>
                    )}
                </div>
            );
        }
        return games;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className={styles['search-container']}>
                <label>Search by Name, Developer or Publisher</label>
                <span className='material-icons'>search</span>
                <input type='text' onChange={(event) => setSearch(event.target.value)}></input>
            </div>
            <div>
                {filteredGames && filteredGames?.length > 0 && (
                    <div className={styles['game-container']}>{createGameCards()}</div>
                )}
            </div>
        </>
    );
}
