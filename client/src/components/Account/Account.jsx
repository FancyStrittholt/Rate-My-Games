import {useDispatch, useSelector} from 'react-redux';
import {useGetAccountQuery} from '../../../api/gamesApi';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Account() {
    const token = useSelector((it) => it.state.token);
    const {data = {}, error, isLoading} = useGetAccountQuery(token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    return <></>;
}
