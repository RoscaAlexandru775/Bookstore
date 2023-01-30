import { useContext } from "react";
import { ToastContext } from "../contexts/toastContext";

const UseToastContext = () => {
  return useContext(ToastContext);
};

export default UseToastContext;
