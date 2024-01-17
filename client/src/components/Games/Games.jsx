import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useGetGamesMutation} from '../../../api/gamesApi';
import {updateGames} from '../../app/slice';
import styles from './Games.module.css';
import GameCard from '../common/GameCard';

export default function Games() {
    const dispatch = useDispatch();
    const games = useSelector((it) => it.state.games);
    const [search, setSearch] = useState('');
    const [filteredGames, setFilteredGames] = useState(games);
    const [getGames, {error, isLoading}] = useGetGamesMutation();

    useEffect(() => {
        fetchGames();
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

    async function fetchGames() {
        try {
            const response = await getGames();
            dispatch(updateGames(response.data));
            setFilteredGames(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function createGameCards() {
        const games = [];

        for (const game of filteredGames) {
            games.push(<GameCard game={game} />);
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
