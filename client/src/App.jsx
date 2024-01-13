
import {Routes, Route} from 'react-router-dom';
import Games from './components/Games.jsx';
import SingleGame from './components/SingleGame.jsx';
import Login from './components/Login';
import Register from './components/Register.jsx';
import Account from './components/Account';
import Leaderboard from './components/Leaderboard.jsx';
import Nav from './components/Nav/Nav.jsx';

export default function App() {
    return (
        <>
            <div id='container'>
                <Nav />
                <div id='main-section'>
                    {
                        <Routes>
                            <Route path='/' element={<Games />}></Route>
                            <Route path='/games/:gameId' element={<SingleGame />}></Route>
                            <Route path='/register' element={<Register />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/account' element={<Account />}></Route>
                            <Route path='/leaderboard' element={<Leaderboard />}></Route>
                        </Routes>
                    }
                </div>
            </div>
        </>
    );
}
