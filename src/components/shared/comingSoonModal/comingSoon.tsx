import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#8D28AD",
    color: "white",
    borderRadius: 10,
  },
};

const ComingSoonModal = ({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean;
  onRequestClose: any;
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h1 style={{ marginLeft: 30 }}>Coming Soon!</h1>
      <p>We're working on it, please check back later.</p>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: 10,
          paddingInline: 20,
          borderRadius: 5,
          marginLeft: 120,
        }}
        onClick={onRequestClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default ComingSoonModal;
