import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import GameCard from "../common/GameCard";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";

const pics = ["lara.png", "aloy.png", 'najuma.png', 'lifeline.png', 'cirilla.png', 'commando.png', 'conner.png', 'evee.png', 'jesse.png', 'joseph.png', 'keanu.png','link.png', 'loba.png', 'sylvanas.png', 'terrorist.png', 'witcher.png'];

export default function Account() {
  const user = useSelector((it) => it.state.user);
  const votes = useSelector((it) => it.state.votes);
  const games = useSelector((it) => it.state.games);
  let [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(pics[0]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, []);

  function createMyGames() {
    const cards = [];
    for (const vote of votes) {
      const game = games.find((it) => it.id === vote.gameid);
      cards.push(<GameCard key={game.id} game={game} />);
    }
    return cards;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <img
        width={150}
        height={150}
        className={styles["profile-pic"]}
        src={
          new URL(`../../assets/images/profile/${user.pic}`, import.meta.url)
            .href
        }
      ></img>
      <button onClick={() => openModal()}>Edit Profile Picture</button>
      <div>
        {user.username}
        <br />
        {user.email}
      </div>
      <div>
        <h2>My fave games</h2>
        {
          <div className={styles["game-container"]}>
            {votes && createMyGames()}
          </div>
        }
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose your avatar
                  </Dialog.Title>
                  <div className="mt-2">
                    <RadioGroup value={selected} onChange={setSelected} className='flex flex-wrap gap-5'>
                      {pics.map((pic) => (
                        <RadioGroup.Option key={pic} value={pic}>
                          {({ active, checked }) => (
                            <>
                              <img
                                width={200}
                                height={200}
                                className={`${
                                  active
                                    ? "ring-2 ring-white/60 ring-offset-4 ring-offset-sky-300"
                                    : ""
                                }
                                      ${
                                        checked
                                          ? "border-sky-900/75 text-white"
                                          : "border-white"
                                      }
                                      relative flex cursor-pointer rounded-full shadow-md focus:outline-none`}
                                src={
                                  new URL(
                                    `../../assets/images/profile/${pic}`,
                                    import.meta.url
                                  ).href
                                }
                              ></img>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
