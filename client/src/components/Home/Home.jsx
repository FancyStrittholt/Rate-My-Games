import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-16">
        {/* hero section */}
        <div className="h-[70vh] hero-background flex flex-col justify-center items-center">
          <div>
            <h1 className="text-6xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-3">
              Video Game Database
            </h1>
          </div>
          <div>
            <p className="text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-10">
              View the most comprensive database for video games and vote on
              your favorites
            </p>
          </div>
          <div>
            <Link
              to="/games"
              className="bg-indigo-600 p-3 px-5 rounded-full text-white border-[1px] border-indigo-950 hover:bg-indigo-500 hover:border-indigo-800"
            >
              Browse Games
            </Link>
          </div>
        </div>
        {/* site desciption seciton */}

        <div className="pl-16 pr-16">
          <div className="flex gap-10 justify-around">
            <div className="flex flex-col justify-center items-center w-[550px] gap-10">
              <h2 className="text-white text-6xl">Create an Account!</h2>
              <p className="text-gray-400">
                Register and account to be able to manage your favorite video
                games. Choose an avitar to personalize your profile.
              </p>
              <Link className="bg-indigo-600 p-3 rounded-full text-lg px-8 text-white border-[1px] border-indigo-200 hover:bg-indigo-500 hover:border-indigo-600">
                Register
              </Link>
            </div>
            <div>
              <img
                className="h-[500px] w-[800px] border-2 border-indigo-950 rounded-lg"
                src={
                  new URL(
                    `../../assets/images/tempprofile.png`,
                    import.meta.url
                  ).href
                }
              ></img>
            </div>
          </div>
        </div>

        <div className="p-16 bg-cyan-900">
          <div className="flex gap-10 justify-around">
            <div>
              <img
                className="h-[500px] w-[800px] border-2 border-indigo-950 rounded-lg"
                src={
                  new URL(
                    `../../assets/images/tempprofile.png`,
                    import.meta.url
                  ).href
                }
              ></img>
            </div>
            <div className="flex flex-col justify-center items-center w-[550px] gap-10">
              <h2 className="text-white text-6xl">View Games</h2>
              <p className="text-gray-400">
                View an extensive database of games of all genres. See a
                description of each game and a link to learn more or try the
                game out for yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="pl-16 pr-16">
          <div className="flex gap-10 justify-around">
            <div className="flex flex-col justify-center items-center w-[550px] gap-10">
              <h2 className="text-white text-6xl">Vote on Games</h2>
              <p className="text-gray-400">
                Vote on your favorite games. View a leaderboard for each genre
                of game, MMO, multiplayer, FPS and many more! Will your favorite
                game be number be at the top?
              </p>
            </div>
            <div>
              <img
                className="h-[500px] w-[800px] border-2 border-indigo-950 rounded-lg"
                src={
                  new URL(
                    `../../assets/images/tempprofile.png`,
                    import.meta.url
                  ).href
                }
              ></img>
            </div>
          </div>
        </div>
        <hr className="border-0 bg-indigo-800 rounded w-2/3 h-1 mx-auto" />

        {/* upcoming games */}
        <div className="w-full gap-5 flex flex-col justify-center items-center">
          <div>
            <h2 className="text-4xl text-white">Upcoming Games</h2>
          </div>
          <div className="flex gap-2">
            <Link to="https://seaofstarsgame.co/">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/seaofstars.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Sea of Stars</p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    Sea of Stars is a turn-based RPG inspired by the classics.
                    It tells the story of two Children of the Solstice who will
                    combine the powers of the sun and moon to perform Eclipse
                    Magic, the only force capable of fending off the monstrous
                    creations of the evil alchemist known as The Fleshmancer.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="https://www.bungie.net/7/en/Destiny/TheFinalShape">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/destiny2.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Destiny 2: The Final Shape
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    The Final Shape looms, a nightmarish calcification of
                    reality into the Witnesss twisted design. Embark on a
                    perilous journey into the heart of the Traveler, rally the
                    Vanguard, and end the War of Light and Darkness.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="https://www.dragonsdogma.com/2/en-us/">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/dragonsdogma2.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Dragons Dogma 2
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    In the game, the player takes on the role of a character
                    called the "Arisen", a hero marked by a dragon who they must
                    defeat, all while exploring the world they live in, taking
                    on quests, and fighting monsters, in the process being
                    caught up in a geopolitical conflict between two kingdoms.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="https://enshrouded.com/">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/enshrouded.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Enshrouded</p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    Enshrouded is a game of survival, crafting, and Action RPG
                    combat, set within a sprawling voxel-based continent. As you
                    journey across the mountains and deserts of an open world,
                    you are free to choose your path and shape your destiny.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <hr className="border-0 bg-indigo-800 rounded w-2/3 h-1 mx-auto" />

        {/* recommended indie games */}
        <div className="w-full  gap-5 flex flex-col justify-center items-center">
          <div>
            <h2 className="text-4xl text-white">Recommended Indie Games</h2>
          </div>
          <div className="flex gap-2">
            <Link to="https://seaofstarsgame.co/">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/seaofstars.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Sea of Stars</p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    Sea of Stars is a turn-based RPG inspired by the classics.
                    It tells the story of two Children of the Solstice who will
                    combine the powers of the sun and moon to perform Eclipse
                    Magic, the only force capable of fending off the monstrous
                    creations of the evil alchemist known as The Fleshmancer.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="https://www.bungie.net/7/en/Destiny/TheFinalShape">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/destiny2.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Destiny 2: The Final Shape
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    The Final Shape looms, a nightmarish calcification of
                    reality into the Witnesss twisted design. Embark on a
                    perilous journey into the heart of the Traveler, rally the
                    Vanguard, and end the War of Light and Darkness.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="https://www.dragonsdogma.com/2/en-us/">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/dragonsdogma2.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Dragons Dogma 2
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    In the game, the player takes on the role of a character
                    called the "Arisen", a hero marked by a dragon who they must
                    defeat, all while exploring the world they live in, taking
                    on quests, and fighting monsters, in the process being
                    caught up in a geopolitical conflict between two kingdoms.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="https://enshrouded.com/">
              <div className="w-[350px] flex flex-col gap-3 justify-center items-center hover:bg-indigo-950 p-2 hover:border-l-2 hover:border-indigo-700">
                <div>
                  <img
                    className="w-[350px] h-[200px]"
                    src={
                      new URL(
                        `../../assets/images/enshrouded.png`,
                        import.meta.url
                      ).href
                    }
                  ></img>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Enshrouded</p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    Enshrouded is a game of survival, crafting, and Action RPG
                    combat, set within a sprawling voxel-based continent. As you
                    journey across the mountains and deserts of an open world,
                    you are free to choose your path and shape your destiny.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <hr className="border-0 bg-indigo-800 rounded w-2/3 h-1 mx-auto" />
      </div>
    </>
  );
}
