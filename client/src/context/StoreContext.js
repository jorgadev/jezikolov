import { createContext, useReducer, useEffect } from "react";
import { USER_LOGIN, USER_LOGOUT, SET_USER } from "@constants/dispatchActions";
import axios from "axios";
import { API_URL } from "@constants/constants";

export const StoreContext = createContext();

export const storeReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };
    case USER_LOGOUT:
      return { ...state, user: null };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, {
    user: null,
  });

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      axios
        .get(`${API_URL}/user.php`, {
          params: { token: userToken },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          dispatch({ type: USER_LOGIN, payload: response.data });
        })
        .catch((error) => {
          console.error("Napaka pri pridobivanju podatkov uporabnika:", error);
          dispatch({ type: USER_LOGOUT });
        });
    }
  }, []);

  console.log("StoreContext", state);

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
