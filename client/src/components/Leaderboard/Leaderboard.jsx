import {useEffect} from 'react';
import {useGetLeaderboardMutation} from '../../../api/gamesApi';
import {useDispatch, useSelector} from 'react-redux';
import {updateLeaderboard} from '../../app/slice';
import GameCard from '../common/GameCard';
import styles from './Leaderboard.module.css';

export default function Leaderboard() {
    const dispatch = useDispatch();
    const [getLeaderboard] = useGetLeaderboardMutation();
    const leaderboards = useSelector((it) => it.state.leaderboards);

    useEffect(() => {
        fetchLeaderboard('overall');
    }, []);

    async function fetchLeaderboard(tag) {
        try {
            const response = await getLeaderboard(tag);
            dispatch(updateLeaderboard({tag, data: response.data}));
        } catch (error) {
            console.error(error);
        }
    }

    function createGameCards(tag) {
        const cards = [];

        for (const game of leaderboards[tag]) {
            cards.push(
                <GameCard game={game}/>
            )
        }
        return cards;
    }

    return (
        <>
            <h2>Overall</h2>
            {leaderboards && <div className={styles['game-container']}>{createGameCards('overall')}</div>}
        </>
    );
}
