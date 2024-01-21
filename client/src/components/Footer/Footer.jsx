import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="flex  bg-indigo-900 p-16 gap-24">
        <div className="flex flex-col gap-5  text-white">
          <h2 className="text-2xl">Video Game Database</h2>

          <p className="text-gray-300">
            Thank you for checking out my video game database site.
          </p>
          <p className="text-gray-300">Developed by Fancypants</p>
          <p className="text-gray-300">
            Have a suggestion? Send them to fakelink@gmail.com
          </p>
          <p className="text-gray-300">{`Copyright © 2023-${year} videogamedatabase.com`}</p>
        </div>
        <div>
          <Link to="/games" className="text-xl text-white hover:text-fuchsia-700">
            Games
          </Link>
        </div>
        <div>
          <Link to="/home" className="text-xl text-white hover:text-cyan-700 ">
            Home
          </Link>
        </div>
        <div>
          <Link to="/leaderboard" className="text-xl text-white hover:text-amber-700">
            Leaderboard
          </Link>
        </div>
        <div>
          <Link to="/account" className="text-xl text-white hover:text-blue-700">
            Account
          </Link>
        </div>
      </div>
    </>
  );
}
