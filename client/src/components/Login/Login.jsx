import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/gamesApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "../../app/slice";

export default function Login() {
  const [login, { isSuccess, error }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onLogin = async (event) => {
    event.preventDefault();

    const response = await login({ username, password });
    if (response?.data) {
      dispatch(updateUser(response.data));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="form w-[500px] h-[350px] border-2 border-[#b35d93] rounded-md">
          <h3 className="text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] p-5">
            Please Login
          </h3>
          <form
            onSubmit={onLogin}
            className="p-5 flex flex-col justify-center items-center relative pb-24 gap-4"
          >
            <div>
              <label className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Username
              </label>
              <br />
              <input
                autoFocus
                autoComplete="off"
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                name="username"
              />
            </div>
            <div>
              <label className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Password
              </label>
              <br />
              <input
                autoComplete="off"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name="Password"
              />
            </div>
            {error?.data && (
              <p className="text-red-600 bg-white p-[1px]">{error?.data}</p>
            )}
            <div className="absolute bottom-0 right-0 pr-8">
              <button
                className="border-solid border-2 border-sky-900 bg-sky-500 pl-1 pr-1 rounded hover:bg-sky-300 hover:border-sky-700"
                type="submit"
                value="Login"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
