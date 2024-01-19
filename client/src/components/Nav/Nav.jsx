import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../app/slice";
import { GiTrophyCup } from "react-icons/gi";
import { SlGameController } from "react-icons/sl";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
import { IoMdLogIn } from "react-icons/io";

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
      <div className="bg-purple-950 flex items-center justify-between text-[#e879f9] pl-[25px] pr-[25px] pt-3 pb-3 font-medium">
        <div>
          <h2 className="text-3xl pl-10">Rate My Games</h2>
        </div>
        <div className="flex gap-[10px] pr-5">
          <SlGameController className="text-[#c026d3] size-6"/>
          <Link className='text-[#c026d3]' to="/">Games</Link>

          <GiTrophyCup className='text-amber-600 size-6'/>
          <Link className='text-amber-600' to="/leaderboard">Leaderboard</Link>

          {!token && (
            <>
              <GiArchiveRegister className='text-blue-600 size-6'/>
              <Link className='text-blue-600' to="/register">Register</Link>
            </>
          )}

          {token && (
            <>
              <BiSolidUserAccount className='text-blue-600 size-6'/>
              <Link className='text-blue-600' to="/account">Account</Link>
            </>
          )}

          {!token && (
            <>
              <IoMdLogIn className='size-6'/>
              <Link to="/login">Login</Link>
            </>
          )}

          {token && (
            <>
              <IoMdLogOut className='size-6'/>
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
