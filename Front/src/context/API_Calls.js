import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch, setError, setMessage, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailure());
    setError(true);
    setMessage(error.response.data.msg);
  }
};
