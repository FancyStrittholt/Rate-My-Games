import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../app/slice";

export default function Nav() {
  const token = useSelector((it) => it.state.user?.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    navigate("/");
    dispatch(updateUser(''));
  }
  return (
    <>
      <div className='bg-fuchsia-600 flex items-center justify-between text-[#f5f5f5] pl-[25px] pr-[25px] font-medium'>
        <div>
          <h2>Rate My Games</h2>
        </div>
        <div className="flex gap-[10px]">
          <span className="material-icons">sports_esports</span>
          <Link to="/">Games</Link>

          <span className="material-icons">sports_esports</span>
          <Link to="/leaderboard">Leaderboard</Link>

          {!token && (
            <>
              <span className="material-icons">app_registration</span>{" "}
              <Link to="/register">Register</Link>
            </>
          )}

          {token && (
            <>
              <span className="material-icons">account_circle</span>
              <Link to="/account">Account</Link>
            </>
          )}

          {!token && (
            <>
              <span className="material-icons">login</span>
              <Link to="/login">Login</Link>
            </>
          )}

          {token && (
            <>
              <span className="material-icons">logout</span>
              <a onClick={() => logout()} to="/">
                Logout
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
