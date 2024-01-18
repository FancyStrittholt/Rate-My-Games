import { useNavigate } from "react-router-dom";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GiChainedHeart } from "react-icons/gi";
import {
  useDownVoteMutation,
  useGetGameVotesMutation,
  useGetMyVotesMutation,
  useUpVoteMutation,
} from "../../../api/gamesApi";
import { updateGameVotes, updateVotes } from "../../app/slice";

export default function GameCard(data) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameVotes = useSelector((it) => it.state.gameVotes);
  const userId = useSelector((it) => it.state.user?.id);
  const votes = useSelector((it) => it.state.votes);
  const [upVote] = useUpVoteMutation();
  const [downVote] = useDownVoteMutation();
  const [getGameVotes] = useGetGameVotesMutation();
  const [getMyVotes] = useGetMyVotesMutation();

  function showDetails(event) {
    navigate(`/games/${event.target.value}`);
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

  function createCard() {
    let haveVoted = false;
    if (votes && votes.length > 0) {
      haveVoted = votes.find((it) => it.gameid === data.game.id) !== undefined;
    }
    const numberOfVotes = gameVotes.find(
      (it) => it.gameid === data.game.id
    )?.votes;

    return (
      <>
        <div key={data.game.id} className={styles["game-card"]}>
          <h2 className="text-cyan-500 text-2xl">{data.game.name}</h2>
          <img
            width='350'
            className="h-[200px]"
            src={
              new URL(`../../assets/images/${data.game.image}`, import.meta.url)
                .href
            }
          ></img>
          <div className='text-cyan-200 flex flex-row justify-between px-[10px] pt-[10px] items-end'>
            <div>
              <button
                value={data.game.id}
                onClick={(event) => showDetails(event)}
                className="border-solid border-2 border-sky-500 bg-sky-900 pl-1 pr-1 rounded"
              >
                Show Details
              </button>
            </div>
            <div>{numberOfVotes ? numberOfVotes : 0} Likes</div>
              {userId && (
                <>
                  {haveVoted ? (
                    <button onClick={() => handleDownvote(data.game.id)}>
                      <GiChainedHeart size='30px' style={{ color: "#c026d3" }} />
                    </button>
                  ) : (
                    <button onClick={() => handleUpvote(data.game.id)}>
                      <GiChainedHeart size='30px' />
                    </button>
                  )}
                </>
              )}
          </div>
        </div>
      </>
    );
  }

  return <>{gameVotes && createCard()}</>;
}
