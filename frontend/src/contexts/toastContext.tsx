import React, { useCallback, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { IToast } from "../models/toast";

export const ToastContext = createContext<any>(null);

function ToastContextProvider({ children }: any) {
  const [toasts, setToasts] = useState([] as IToast[]);
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts((ts) => ts.slice(1)), 5000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [toasts]);

  const addToast = useCallback(
    (toast: IToast) => {
      setToasts((ts) => [...ts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 98,
        }}
      >
        {toasts.map((toast, index) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={`toast-index-${index}`}
            type="button"
            onClick={() => {
              if (toast.externalLink) {
                window.open(toast.externalLink, "_blank");
              } else if (toast.internalLink) {
                navigate(toast.internalLink);
              }
            }}
            disabled={!toast.externalLink && !toast.internalLink}
            style={{
              cursor:
                !toast.externalLink && !toast.internalLink
                  ? "default"
                  : "pointer",
              backgroundColor: toast.isError ? "#D22B2B" : "#1BD909",
              color: "white",
              margin: 5,
              padding: 20,
              zIndex: 99,
              width: "20vw",
              wordWrap: "break-word",
              border: "none",
              alignContent: "start",
              justifyContent: "start",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: 5,
              }}
            >
              {toast.title}
            </div>
            <div style={{ fontSize: "1.2rem" }}>{toast.message}</div>
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastContextProvider;
