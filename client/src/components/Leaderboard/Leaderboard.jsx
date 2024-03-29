import { useEffect, useState } from "react";
import {
  useGetGameVotesMutation,
  useGetLeaderboardMutation,
} from "../../../api/gamesApi";
import { useDispatch, useSelector } from "react-redux";
import { updateGameVotes, updateLeaderboard } from "../../app/slice";
import GameCard from "../common/GameCard";
import styles from "./Leaderboard.module.css";
import { Tab } from "@headlessui/react";

export default function Leaderboard() {
  const dispatch = useDispatch();
  const [getLeaderboard] = useGetLeaderboardMutation();
  const leaderboards = useSelector((it) => it.state.leaderboards);
  const [currentTag, setCurrentTag] = useState("All");
  const [getGameVotes] = useGetGameVotesMutation();

  useEffect(() => {
    console.log(currentTag);
    fetchLeaderboard(currentTag);
    fetchGameVotes();
  }, []);

  async function fetchLeaderboard(tag) {
    try {
      const response = await getLeaderboard(tag);
      dispatch(updateLeaderboard({ tag, data: response.data }));
      setCurrentTag(tag);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchGameVotes() {
    try {
      const response = await getGameVotes();
      dispatch(updateGameVotes(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function createGameCards() {
    const cards = [];

    for (const game of leaderboards[currentTag]) {
      cards.push(<GameCard key={game.id} game={game} />);
    }
    return cards;
  }

  return (
    <>
      {leaderboards && (
        <div className="w-full sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 mt-3 ml-8 mr-8">
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-rose-600 w-full rounded-lg py-1.5 text-sm font-medium",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("All")}
            >
              All
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-pink-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("FPS")}
            >
              FPS
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-fuchsia-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Open World")}
            >
              Open World
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-purple-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Free to Play")}
            >
              Free to Play
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-violet-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("MMO")}
            >
              MMO
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-indigo-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Pixel")}
            >
              Pixel
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-blue-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Choices Matter")}
            >
              Choices Matter
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-cyan-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Survival")}
            >
              Survival
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-teal-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("RPG")}
            >
              RPG
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-emerald-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Multiplayer")}
            >
              Multiplayer
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-green-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Single Player")}
            >
              Single Player
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-lime-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Post Apocalyptic")}
            >
              Post Apocalyptic
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-yellow-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Puzzle")}
            >
              Puzzle
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-amber-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Action")}
            >
              Action
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "bg-red-600 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => fetchLeaderboard("Fantasy")}
            >
              Fantasy
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles["game-container"]}>
                {createGameCards()}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        </div>
      )}
    </>
  );
}
