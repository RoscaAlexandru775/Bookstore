import React, { createContext, useCallback, useMemo, useState } from "react";
import { ContextData } from "../models/context";

interface StateCtxInterface {
  state: ContextData;
  actions: {
    logout: () => void;
    addToCart: () => void;
    removeFromCart: () => void;
    setUserName: (data: string) => void;
    setUserRole: (data: string) => void;
  };
}
const initialState: StateCtxInterface = {
  state: {
    name: "",
    role: "",
    reservedBooksNumber: 0,
  },
  actions: {
    logout: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    setUserName: (data: string) => {},
    setUserRole: (data: string) => {},
  },
};

export const Context = createContext<StateCtxInterface>(initialState);

const MainContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ContextData>({} as ContextData);

  const logout = useCallback(() => {
    setState({} as ContextData);
  }, []);
  const addToCart = useCallback(() => {
    setState({ ...state, reservedBooksNumber: state.reservedBooksNumber + 1 });
  }, [state]);
  const removeFromCart = useCallback(() => {
    setState({ ...state, reservedBooksNumber: state.reservedBooksNumber - 1 });
  }, [state]);
  const setUserName = useCallback(
    (text: string) => {
      setState({ ...state, name: text });
    },
    [state]
  );
  const setUserRole = useCallback(
    (text: string) => {
      setState({ ...state, role: text });
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
        setUserName,
        setUserRole,
      },
    }),
    [state, addToCart, setUserName, setUserRole, removeFromCart, logout]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default MainContext;
