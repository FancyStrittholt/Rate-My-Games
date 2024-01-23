import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import GameCard from "../common/GameCard";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { useUpdatePicMutation } from "../../../api/gamesApi";
import { updateUser } from "../../app/slice";
import stars from "../../assets/images/stars.mp4";
import { FaRegEdit } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";

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
  let [isUsernameOpen, setIsUsernameOpen] = useState(false);
  let [isEmailOpen, setIsEmailOpen] = useState(false);
  let [username, setUsername] = useState();
  let [email, setEmail] = useState();
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

  function closeUsernameModal() {
    setIsUsernameOpen(false);
  }

  function closeEmailModal() {
    setIsEmailOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openUsernameModal() {
    setIsUsernameOpen(true);
  }

  function openEmailModal() {
    setIsEmailOpen(true);
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

  async function updateUsername() {
    const updatedUser = await updateUsername({
      id: user.id,
      username: username,
      token: user.token,
    });
    dispatch(updateUser(updatedUser.data));
    closeUsernameModal();
  }

  async function updateEmail() {
    const updatedEmail = await updateEmail({
      id: user.id,
      email: email,
      token: user.token,
    });
    dispatch(updateUser(updatedEmail.data));
    closeEmailModal();
  }

  return (
    <>
      <div className="p- flex flex-row justify-center items-center gap-10">
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
          {/* <button
            className="text-sm text-fuchsia-600 border-solid border-2 border-sky-500 pl-4 pr-4"
            onClick={() => openModal()}
          >
            Edit
          </button> */}
          <RiImageEditLine
            className="text-fuchsia-600 text-2xl bg-gray-800 hover:text-cyan-600"
            onClick={() => openModal()}
          />
        </div>
        <div className="text-fuchsia-600 text-4xl flex">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              {user.username}
              <FaRegEdit
                className="text-xl bg-gray-800 hover:text-cyan-600"
                onClick={() => openUsernameModal()}
              />
            </div>
            <div className="flex gap-2">
              {user.email}
              <FaRegEdit
                className="text-xl bg-gray-800 hover:text-cyan-600"
                onClick={() => openEmailModal()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-3xl flex justify-center items-center pt-8">
        <h2 className="text-cyan-600">Your favorite games</h2>
      </div>
      <div>
        {
          <div className={styles["game-container"]}>
            {votes && createMyGames()}
          </div>
        }
      </div>
      {/* Profile pic modal */}
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
            <div className="fixed inset-0" />
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
                    className="text-xl font-medium leading-6 text-purple-200"
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
                                          ? "border-purple-900/75 text-white"
                                          : "border-pink-900"
                                      }
                                      relative flex cursor-pointer rounded-full shadow-md focus:outline-none ring-2 ring-indigo-950 ring-offset-2 ring-offset-indigo-600`}
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

      {/* Username modal */}
      <Transition appear show={isUsernameOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeUsernameModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-purple-200"
                  >
                    Update Username
                  </Dialog.Title>
                  <div className="flex flex-col mt-3 mb-5">
                    <video
                      src={stars}
                      autoPlay={true}
                      loop
                      muted
                      className="absolute -z-10 w-auto min-w-full min-h-full max-w-none"
                    ></video>

                    <div className="flex flex-col justify-center items-center pt-5 gap-2">
                      <label className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        Enter new Username
                      </label>
                      <input
                        className="w-48"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        name="username"
                        defaultValue={user.username}
                        onChange={(e)=> setUsername(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end mr-5">
                      
                      <button onClick={() => updateUsername()} className="w-12 bg-white text-indigo-800 p-2 rounded-md mt-3">
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Email modal */}
      <Transition appear show={isEmailOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEmailModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-purple-200"
                  >
                    Update Email
                  </Dialog.Title>
                  <div className="flex flex-col mt-3 mb-5">
                    <video
                      src={stars}
                      autoPlay={true}
                      loop
                      muted
                      className="absolute -z-10 w-auto min-w-full min-h-full max-w-none"
                    ></video>

                    <div className="flex flex-col justify-center items-center gap-2 pt-5">
                      <label className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        Enter new email address
                      </label>
                      <input
                        className="w-48"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        name="email"
                        defaultValue={user.email}
                        onChange={(e)=> setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end mr-5">
                      
                      <button onClick={() => updateEmail()} className="w-12 bg-white text-indigo-800 p-2 rounded-md mt-3">
                        Save
                      </button>
                    </div>
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
