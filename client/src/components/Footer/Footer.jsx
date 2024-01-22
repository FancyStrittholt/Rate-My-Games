import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="flex  bg-indigo-950 p-10 gap-16">
        <div className="flex flex-col gap-3  text-[#58ced2]">
          <h2 className="text-2xl">Video Game Database</h2>

          <p className="text-[#d06ec1]">
            Thank you for checking out my video game database site.
          </p>
          <p className="text-[#5094c0]">Developed by Fancypants</p>
          <p className="text-[#d06ec1]">
            Have a suggestion? Send them to fakelink@gmail.com
          </p>
          <p className="text-[#5094c0]">{`Copyright © 2023-${year} videogamedatabase.com`}</p>
        </div>
        <div>
          <Link to="/games" className="text-xl text-[#58ced2] hover:text-fuchsia-700">
            Games
          </Link>
        </div>
        <div>
          <Link to="/home" className="text-xl text-[#58ced2] hover:text-cyan-700 ">
            Home
          </Link>
        </div>
        <div>
          <Link to="/leaderboard" className="text-xl text-[#58ced2] hover:text-amber-700">
            Leaderboard
          </Link>
        </div>
        <div>
          <Link to="/account" className="text-xl text-[#58ced2] hover:text-blue-700">
            Account
          </Link>
        </div>
      </div>
    </>
  );
}
