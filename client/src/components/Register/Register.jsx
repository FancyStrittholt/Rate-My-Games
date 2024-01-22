import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../api/gamesApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../app/slice";

export default function Register() {
  const VALID_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const VALID_PASSWORD = /^[A-z0-9!@#$%]{4,12}$/;

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setValidEmail(VALID_EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(VALID_PASSWORD.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const canSave =
    username.length > 2 && validEmail && validPassword && !isLoading;

  const onRegister = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!validEmail) {
      errors.email = "Invalid Email";
    }

    if (!validPassword) {
      errors.password = "Invalid Password";
    }

    if (username.length < 2) {
      errors.firstName = "Invalid First Name";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (canSave) {
      const response = await register({ username, email, password });
      console.log(response);
      dispatch(updateUser(response.data));
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="form w-[500px] h-[400px] border-2 border-[#b35d93] rounded-md">
        <h3 className="text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] p-5">Create an Account</h3>

        <form
          className="p-5 flex flex-col justify-center items-center relative pb-28 gap-4"
          onSubmit={onRegister}
        >
          <div>
            <label className='text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Username</label>
            <br />
            <input
              autoFocus
              type="text"
              name="username"
              autoComplete="off"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label className='text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Email</label>
            <br />
            <input
              type="text"
              name="email"
              autoComplete="off"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className='text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Password</label>
            <br />
            <input
              type="text"
              name="password"
              autoComplete="off"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="absolute bottom-0 right-0 pr-8">
            <button
              className="border-solid border-2 border-sky-500 bg-sky-900 pl-1 pr-1 rounded hover:bg-sky-800"
              type="submit"
              value="Send Request"
              onClick={(event) => register(event)}
            >
              Register
            </button>
          </div>
        </form>
        {error?.data && <p className="error">{error?.data}</p>}
        {errors.firstName ? <p className="error">{errors.firstName}</p> : null}
        {errors.lastName ? <p className="error">{errors.lastName}</p> : null}
        {errors.email ? <p className="error">{errors.email}</p> : null}
        {errors.password ? <p className="error">{errors.password}</p> : null}
      </div>
    </div>
  );
}
