import { useDispatch, useSelector } from "react-redux";
import {
  useDownVoteMutation,
  useGetGameVotesMutation,
  useGetMyVotesMutation,
  useGetSingleGameQuery,
  useUpVoteMutation,
} from "../../../api/gamesApi";
import { useNavigate, useParams } from "react-router-dom";
import { updateGameVotes, updateVotes } from "../../app/slice";
import { GiChainedHeart } from "react-icons/gi";

export default function SingleGame() {
  const dispatch = useDispatch();
  const token = useSelector((it) => it.state.token);
  const navigate = useNavigate();
  const [upVote] = useUpVoteMutation();
  const [downVote] = useDownVoteMutation();
  const [getGameVotes] = useGetGameVotesMutation();
  const [getMyVotes] = useGetMyVotesMutation();
  const gameVotes = useSelector((it) => it.state.gameVotes);
  const userId = useSelector((it) => it.state.user?.id);
  const votes = useSelector((it) => it.state.votes);

  const { gameId } = useParams();

  const { data = {}, error, isLoading } = useGetSingleGameQuery(gameId);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    console.log(data);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function fetchMyVotes() {
    try {
      const response = await getMyVotes(userId);
      dispatch(updateVotes(response.data));
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

  async function handleUpvote(gameid) {
    await upVote({ userid: userId, gameid });
    fetchMyVotes();
    fetchGameVotes();
  }

  async function handleDownvote(gameid) {
    await downVote({ userid: userId, gameid });
    fetchMyVotes();
    fetchGameVotes();
  }

  let haveVoted = false;
  if (votes && votes.length > 0) {
    haveVoted = votes.find((it) => it.gameid === data.id) !== undefined;
  }
  const numberOfVotes = gameVotes.find((it) => it.gameid === data.id)?.votes;
  return (
    <>
      <div className="flex justify-center items-center mb-10 mt-10">
        <div
          className="w-[500px] border-2 border-fuchsia-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[15px] text-black font-bold flex flex-col justify-between px-[10px] pt-[10px] gap-3"
          key={data.id}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-cyan-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl">
              {data.name}
            </h2>
            <div className=" text-purple-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {numberOfVotes ? numberOfVotes : 0} Likes
            </div>
            {userId && (
              <>
                {haveVoted ? (
                  <button onClick={() => handleDownvote(data.id)}>
                    <GiChainedHeart size="30px" style={{ color: "#c026d3" }} />
                  </button>
                ) : (
                  <button onClick={() => handleUpvote(data.id)}>
                    <GiChainedHeart className='text-cyan-200' size="30px" />
                  </button>
                )}
              </>
            )}
          </div>
          <img
            width={500}
            className="h-[300px]"
            src={
              new URL(`../../assets/images/${data.image}`, import.meta.url).href
            }
          ></img>

          <p>Developer: {data.developer} </p>
          <p>Publisher: {data.publisher}</p>
          <div>
            <p> {data.description} </p>
          </div>
          <p>
            Get Game Now:{" "}
            <a
              className="text-blue-900 text-sm"
              rel="noreferrer"
              href={data.link}
              target="_blank"
            >
              {data.link}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
