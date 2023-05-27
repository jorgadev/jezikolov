import { createContext, useReducer, useEffect } from "react";
import { DISPATCH_ACTIONS } from "../constants";

export const StoreContext = createContext();

export const storeReducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_ACTIONS.USER_LOGIN:
      return { ...state, user: action.payload };
    case DISPATCH_ACTIONS.USER_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, {
    user: null,
  });

  useEffect(() => {
    const userToken = localStorage.getItem("user");

    if (userToken) {
      dispatch({ type: DISPATCH_ACTIONS.USER_LOGIN, payload: response.data });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
