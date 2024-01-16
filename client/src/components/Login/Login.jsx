import {useNavigate} from 'react-router-dom';
import {useLoginMutation} from '../../../api/gamesApi';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {updateToken} from '../../app/slice';

export default function Login() {
    const [login, {isSuccess, error}] = useLoginMutation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    const onLogin = async (event) => {
        event.preventDefault();

        const response = await login({username, password});
        dispatch(updateToken(response.data.token));
    };

    return (
        <>
            <div className='loginForm'>
                <div className='login-card'>
                    <form onSubmit={onLogin}>
                        <h2>Login</h2>
                        <label>Username</label>
                        <br />
                        <input
                            autoFocus
                            autoComplete='off'
                            onChange={(event) => setUsername(event.target.value)}
                            type='text'
                            name='username'
                        />
                        <br />
                        <label>Password</label>
                        <br />
                        <input
                            autoComplete='off'
                            onChange={(event) => setPassword(event.target.value)}
                            type='text'
                            name='Password'
                        />
                        <br />
                        <br />
                        <input className='login-button' type='submit' value='Login' />
                    </form>
                    {error?.data?.message && <p className='error'>{error?.data?.message}</p>}
                </div>
            </div>
        </>
    );
}
