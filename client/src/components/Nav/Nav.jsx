import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../app/slice";
import { GiTrophyCup } from "react-icons/gi";
import { SlGameController } from "react-icons/sl";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";

export default function Nav() {
  const token = useSelector((it) => it.state.user?.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    navigate("/");
    dispatch(updateUser(""));
  }
  return (
    <>
      <div className="bg-purple-950 flex items-center justify-between text-[#f5f5f5] pl-[25px] pr-[25px] pt-3 pb-3 font-medium">
        <div>
          <h2 className="text-2xl">Rate My Games</h2>
        </div>
        <div className="flex gap-[10px]">
          <SlGameController className="text-[#c026d3]" />
          <Link className='text-[#c026d3]' to="/">Games</Link>

          <GiTrophyCup className='text-orange-600'/>
          <Link className='text-orange-600' to="/leaderboard">Leaderboard</Link>

          {!token && (
            <>
              <span className="material-icons">app_registration</span>{" "}
              <Link to="/register">Register</Link>
            </>
          )}

          {token && (
            <>
              <BiSolidUserAccount className='text-blue-600'/>
              <Link className='text-blue-600' to="/account">Account</Link>
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
              <IoMdLogOut>Logout</IoMdLogOut>
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
