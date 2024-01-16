import {useDispatch, useSelector} from 'react-redux';
import {useGetSingleGameQuery} from '../../../api/gamesApi';
import {useNavigate, useParams} from 'react-router-dom';

export default function SingleGame() {
    const dispatch = useDispatch();
    const token = useSelector((it) => it.state.token);
    const navigate = useNavigate();

    const {gameId} = useParams();

    const {data = {}, error, isLoading} = useGetSingleGameQuery(gameId);

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        console.log(data);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className='game'>
                <div className='game-info' key={data.id}>
                    <div>
                        <h2> {data.name} </h2>
                        <img
                        width={320}
                        height={200}
                        src={new URL(`../../assets/images/${data.image}`, import.meta.url).href}
                    ></img>
                        <p>Developer: {data.developer} </p>
                        <p>Publisher: {data.publisher}</p>
                        <p>Description: {data.description}</p>
                        <p>Get Game Now: <a rel="noreferrer" href={data.link} target="_blank">{data.link}</a></p>
                    </div>
                    <div className='game-description'>
                        <p className='paragraph'> {data.description} </p>
                    </div>
                </div>
            </div>
        </>
    );
}
