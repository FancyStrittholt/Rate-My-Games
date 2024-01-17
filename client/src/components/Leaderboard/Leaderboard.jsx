import {useEffect, useState} from 'react';
import {useGetGameVotesMutation, useGetLeaderboardMutation} from '../../../api/gamesApi';
import {useDispatch, useSelector} from 'react-redux';
import {updateGameVotes, updateLeaderboard} from '../../app/slice';
import GameCard from '../common/GameCard';
import styles from './Leaderboard.module.css';

export default function Leaderboard() {
    const dispatch = useDispatch();
    const [getLeaderboard] = useGetLeaderboardMutation();
    const leaderboards = useSelector((it) => it.state.leaderboards);
    const [currentTag, setCurrentTag] = useState('All');
    const [getGameVotes] = useGetGameVotesMutation();

    useEffect(() => {
        fetchLeaderboard(currentTag);
        fetchGameVotes();
    }, []);

    async function fetchLeaderboard(tag) {
        try {
            const response = await getLeaderboard(tag);
            dispatch(updateLeaderboard({tag, data: response.data}));
            setCurrentTag(tag);
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

    function createGameCards() {
        const cards = [];

        for (const game of leaderboards[currentTag]) {
            cards.push(<GameCard key={game.id} game={game} />);
        }
        return cards;
    }

    return (
        <>
            <button onClick={() => fetchLeaderboard('All')}>All</button>
            <button onClick={() => fetchLeaderboard('FPS')}>FPS</button>
            <button onClick={() => fetchLeaderboard('Open World')}>Open World</button>
            <button onClick={() => fetchLeaderboard('Free to Play')}>Free to Play</button>
            <button onClick={() => fetchLeaderboard('MMO')}>MMO</button>
            <button onClick={() => fetchLeaderboard('Pixel')}>Pixel</button>
            <button onClick={() => fetchLeaderboard('Choices Matter')}>Choices Matter</button>
            <button onClick={() => fetchLeaderboard('Survival')}>Survival</button>
            <button onClick={() => fetchLeaderboard('RPG')}>RPG</button>
            <button onClick={() => fetchLeaderboard('Multiplayer')}>Multiplayer</button>
            <button onClick={() => fetchLeaderboard('Single Player')}>Single Player</button>
            <button onClick={() => fetchLeaderboard('Post Apocalyptic')}>Post Apocalyptic</button>
            <button onClick={() => fetchLeaderboard('Puzzle')}>Puzzle</button>
            <button onClick={() => fetchLeaderboard('Action')}>Action</button>
            <button onClick={() => fetchLeaderboard('Fantasy')}>Fantasy</button>
            <h2>{currentTag}</h2>
            {leaderboards && <div className={styles['game-container']}>{createGameCards()}</div>}
        </>
    );
}
