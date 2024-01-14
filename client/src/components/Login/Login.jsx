import {useNavigate} from 'react-router-dom';
import {useLoginMutation} from '../../../api/gamesApi';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {updateToken} from '../../app/slice';

export default function Login() {
    const [login, {isSuccess, error}] = useLoginMutation();

    const [email, setEmail] = useState('');
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

        const response = await login({email, password});
        dispatch(updateToken(response.data.token));
    };

    return (
        <>
            <div className='loginForm'>
                <div className='login-card'>
                    <form onSubmit={onLogin}>
                        <h2>Login</h2>
                        <label>Email</label>
                        <br />
                        <input
                            autoFocus
                            autoComplete='off'
                            onChange={(event) => setEmail(event.target.value)}
                            type='text'
                            name='Email'
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
