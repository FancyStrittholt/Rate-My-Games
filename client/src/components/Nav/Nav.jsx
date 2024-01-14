import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../app/slice';
import styles from './Nav.module.css';

export default function Nav() {
    const token = useSelector((it) => it.state.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        navigate('/');
        dispatch(updateToken(''));
    }
    return (
        <>
            <div className={styles.nav}>
                <div className='navigation'>
                    <div className='title'>
                        <h2>Rate My Games</h2>
                        <span className='material-icons'>diversity_1</span>
                    </div>
                    <div className='nav-links'>
                        <span className='material-icons'>home</span>
                        <Link to='/'>Home</Link>

                        {!token && (
                            <>
                                <span className='material-icons'>local_library</span>{' '}
                                <Link to='/register'>Register</Link>
                            </>
                        )}

                        {token && (
                            <>
                                <span className='material-icons'>account_circle</span>
                                <Link to='/account'>Account</Link>
                            </>
                        )}

                        {!token && (
                            <>
                                <span className='material-icons'>login</span>
                                <Link to='/login'>Login</Link>
                            </>
                        )}

                        {token && (
                            <>
                                <span className='material-icons'>logout</span>
                                <a onClick={() => logout()} to='/'>
                                    Logout
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
