import {Routes, Route} from 'react-router-dom';
import Games from './components/Games/Games.jsx';
import Home from './components/Home/Home.jsx';
import SingleGame from './components/SingleGame/SingleGame.jsx';
import Login from './components/Login/Login';
import Register from './components/Register/Register.jsx';
import Account from './components/Account/Account';
import Leaderboard from './components/Leaderboard/Leaderboard.jsx';
import Nav from './components/Nav/Nav.jsx';

export default function App() {
    return (
        <>
            <div id='container'>
                <Nav />
                <div id='main-section'>
                    {
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/games' element={<Games />}></Route>
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
