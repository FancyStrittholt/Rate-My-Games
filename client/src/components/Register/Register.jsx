import {useEffect, useState} from 'react';
import {useRegisterMutation} from '../../../api/gamesApi';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../app/slice';
import styles from './Register.module.css';

export default function Register() {
    const VALID_EMAIL =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const VALID_PASSWORD = /^[A-z0-9!@#$%]{4,12}$/;

    const [register, {isLoading, isSuccess, error}] = useRegisterMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setValidEmail(VALID_EMAIL.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(VALID_PASSWORD.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    const canSave = username.length > 2 && validEmail && validPassword && !isLoading;

    const onRegister = async (event) => {
        event.preventDefault();

        const errors = {};

        if (!validEmail) {
            errors.email = 'Invalid Email';
        }

        if (!validPassword) {
            errors.password = 'Invalid Password';
        }

        if (username.length < 2) {
            errors.firstName = 'Invalid First Name';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        if (canSave) {
            const response = await register({username, email, password});
            dispatch(updateToken(response.data.token));
        }
    };

    return (
        <div className={styles['register-container']}>
            <div className='register-card'>
                <h2>Register Now</h2>
                <form onSubmit={onRegister}>
                    <label>Username</label>
                    <br />
                    <input
                        autoFocus
                        type='text'
                        name='username'
                        autoComplete='off'
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <br />
                    <label>Email</label>
                    <br />
                    <input
                        type='text'
                        name='email'
                        autoComplete='off'
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <br />
                    <label>Password</label>
                    <br />
                    <input
                        type='text'
                        name='password'
                        autoComplete='off'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <br />
                    <br />
                    <button
                        className='register-button'
                        type='submit'
                        value='Send Request'
                        onClick={(event) => register(event)}
                    >
                        Register
                    </button>
                </form>
                {error?.data?.message && <p className='error'>{error?.data?.message}</p>}
                {errors.firstName ? <p className='error'>{errors.firstName}</p> : null}
                {errors.lastName ? <p className='error'>{errors.lastName}</p> : null}
                {errors.email ? <p className='error'>{errors.email}</p> : null}
                {errors.password ? <p className='error'>{errors.password}</p> : null}
            </div>
        </div>
    );
}
