import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { useState } from "react";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("User")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext({ INITIAL_STATE });

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null);

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BASE_URL + "protected",
          {
            headers: { Authorization: "Bearer " + state.user.access_token },
          }
        );
        setCurrentUserName(res.data.username);
        setCurrentUser(res.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        currentUser,
        currentUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
