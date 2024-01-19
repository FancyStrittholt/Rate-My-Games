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
    dispatch(updateUser(response.data));
  };

  return (
    <>
      <div className="flex justify-center items-center mt-[10%]">
        <div className="bg-purple-400 w-[500px] h-[350px] border-2 border-green-300 rounded-md">
          <h3 className="text-2xl p-5">Please Login</h3>
          <form
            onSubmit={onLogin}
            className="p-5 flex flex-col justify-center items-center relative pb-28 gap-4"
          >
            <div>
              <label className="username">Username</label>
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
              <label className="password">Password</label>
              <br />
              <input
                autoComplete="off"
                onChange={(event) => setPassword(event.target.value)}
                type="text"
                name="Password"
              />
            </div>
            <div className="absolute bottom-0 right-0 pr-8">
              <button
                className="border-solid border-2 border-sky-500 bg-sky-900 pl-1 pr-1 rounded hover:bg-sky-800"
                type="submit"
                value="Login"
              >
                Login
              </button>
            </div>
          </form>
          {error?.data?.message && (
            <p className="error">{error?.data?.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
