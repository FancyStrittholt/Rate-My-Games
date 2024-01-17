import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Account.module.css';
import GameCard from '../common/GameCard';


export default function Account() {
    const user = useSelector((it) => it.state.user);
    const votes = useSelector((it) => it.state.votes);
    const games = useSelector((it) => it.state.games);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, []);

    function createMyGames() {
        const cards = [];
        for (const vote of votes) {
            const game = games.find(it => it.id === vote.gameid)
            cards.push(
                <GameCard key={game.id} game={game} />
            )

        }
        return cards;
    }

    return (
        <>
            <img
                width={150}
                height={150}
                className={styles['profile-pic']}
                src={new URL(`../../assets/images/profile/${user.pic}`, import.meta.url).href}
            ></img>
            <div>
                {user.username}
                <br />
                {user.email}
            </div>
            <div>
                <h2>My fave games</h2>
                {<div className={styles['game-container']}>{createMyGames()}</div>}
            </div>
        </>
    );
}
