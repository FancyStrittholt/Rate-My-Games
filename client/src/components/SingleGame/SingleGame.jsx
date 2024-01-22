import { useDispatch, useSelector } from "react-redux";
import { useGetSingleGameQuery } from "../../../api/gamesApi";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SingleGame.module.css";

export default function SingleGame() {
  const dispatch = useDispatch();
  const token = useSelector((it) => it.state.token);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="flex justify-center items-center mb-10">
        <div
          className="w-[500px] border-2 border-fuchsia-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[15px] text-black font-bold flex flex-col justify-between px-[10px] pt-[10px] gap-3"
          key={data.id}
        >
          <h2 className="text-cyan-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl"> {data.name} </h2>
          <img
            width={500}
            className='h-[300px]'
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
            <a className='text-blue-900 text-sm' rel="noreferrer" href={data.link} target="_blank">
              {data.link}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
