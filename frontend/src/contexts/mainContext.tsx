import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ContextData } from "../models/context";

interface StateCtxInterface {
  state: ContextData;
  actions: {
    logout: () => void;
    addToCart: () => void;
    removeFromCart: () => void;
    setUserData: (name: string, role: string, userId: number) => void;
  };
}
const initialState: StateCtxInterface = {
  state: {
    name: "",
    role: "",
    userId: 0,
    reservedBooksNumber: 0,
  },
  actions: {
    logout: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    setUserData: (name: string, role: string, userId: number) => {},
  },
};

export const Context = createContext<StateCtxInterface>(initialState);

const MainContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ContextData>({} as ContextData);

  useEffect(() => {}, []);
  const logout = useCallback(() => {
    setState({} as ContextData);
  }, []);
  const addToCart = useCallback(() => {
    setState({ ...state, reservedBooksNumber: state.reservedBooksNumber + 1 });
  }, [state]);
  const removeFromCart = useCallback(() => {
    setState({ ...state, reservedBooksNumber: state.reservedBooksNumber - 1 });
  }, [state]);
  const setUserData = useCallback(
    (nameValue: string, roleValue: string, userIdValue: number) => {
      setState({
        ...state,
        name: nameValue,
        role: roleValue,
        userId: userIdValue,
        reservedBooksNumber: 0,
      });
    },
    [state]
  );

  const contextValue: StateCtxInterface = useMemo(
    () => ({
      state,
      actions: {
        logout,
        addToCart,
        removeFromCart,
        setUserData,
      },
    }),
    [state, addToCart, setUserData, removeFromCart, logout]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useData = () => {
  const { state } = useContext(Context);
  return state;
};

export const useActions = () => {
  const { actions } = useContext(Context);
  return actions;
};

export default MainContext;
