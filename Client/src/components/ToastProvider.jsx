import React from "react";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  X,
  CircleCheck,
  AlertOctagon,
  AlertTriangle,
  Info,
} from "lucide-react";

export const notify = {
  success: (msg) =>
    toast.success(msg, {
      icon: <CircleCheck color="currentColor" size={20} />,
      style: {
        background: "#22c55e",
        color: "#ffffff",
        padding: "12px 16px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
      },
    }),
  error: (msg) =>
    toast.error(msg, {
      icon: <AlertOctagon color="currentColor" size={20} />,
      style: {
        background: "#dc2626",
        color: "#ffffff",
        padding: "12px 16px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
      },
      // icon: false,
    }),
  warning: (msg) =>
    toast.warn(msg, {
      icon: <AlertTriangle color="currentColor" size={20} />,
      style: {
        background: "#f97316",
        color: "#ffffff",
        padding: "12px 16px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
      },
      // icon: false,
    }),
  info: (msg) =>
    toast.info(msg, {
      icon: <Info color="currentColor" size={20} />,
      style: {
        background: "#3b82f6",
        color: "#ffffff",
        padding: "12px 16px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
      },
      // icon: false,
    }),
};

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      // transition={Slide}
      transition={Bounce}
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      toastStyle={{
        padding: "12px 16px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
        color: "#fff",
      }}
      closeButton={({ closeToast }) => (
        <button
          onClick={closeToast}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X color="#FFFFFF" size={16} />
        </button>
      )}
      toastClassName="custom-toast"
      progressClassName="custom-progress"
    />
  );
};

export default ToastProvider;
