import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import GameCard from "../common/GameCard";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { useUpdatePicMutation } from "../../../api/gamesApi";
import { updateUser } from "../../app/slice";
import stars from "../../assets/images/stars.mp4";

const pics = [
  "lara.png",
  "aloy.png",
  "najuma.png",
  "lifeline.png",
  "ciri.png",
  "commando.png",
  "conner.png",
  "evee.png",
  "jesse.png",
  "joseph.png",
  "keanu.png",
  "link.png",
  "loba.png",
  "sylvanas.png",
  "terrorist.png",
  "chloe.png",
  "squid.png",
  "kratos.png",
  "Tom.png",
  "sponge.png",
  "red.png",
  "mario.png",
  "robo.png",
  "hotdog.png",
];

export default function Account() {
  const user = useSelector((it) => it.state.user);
  const votes = useSelector((it) => it.state.votes);
  const games = useSelector((it) => it.state.games);
  let [isOpen, setIsOpen] = useState(false);
  const [updatePic] = useUpdatePicMutation();
  const dispatch = useDispatch();

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

  async function updateAvatar(pic) {
    const updatedUser = await updatePic({
      id: user.id,
      pic: pic,
      token: user.token,
    });
    dispatch(updateUser(updatedUser.data));
    closeModal();
  }

  return (
    <>
      <div className="flex flex-row items-center gap-10">
        <div>
          <img
            width={150}
            height={150}
            className={styles["profile-pic"]}
            src={
              new URL(
                `../../assets/images/profile/${user.pic}`,
                import.meta.url
              ).href
            }
          ></img>
        </div>
        <div className="text-fuchsia-600">
          {user.username}
          <br />
          {user.email}
        </div>
      </div>
      <button
        className="text-fuchsia-600 border-solid border-2 border-sky-500 pl-4 pr-4"
        onClick={() => openModal()}
      >
        Edit
      </button>

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
                <Dialog.Panel className="w-full max-w-8xl transform overflow-hidden rounded-2xl bg-black text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-purple-200"
                  >
                    Choose your avatar
                  </Dialog.Title>
                  <div className="mt-2">
                    <video
                      src={stars}
                      autoPlay={true}
                      loop
                      muted
                      className="absolute -z-10 w-auto min-w-full min-h-full max-w-none"
                    ></video>
                    <RadioGroup className="flex flex-wrap gap-5 pl-5 pt-5">
                      {pics.map((pic) => (
                        <RadioGroup.Option
                          onClick={() => updateAvatar(pic)}
                          key={pic}
                          value={pic}
                        >
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
