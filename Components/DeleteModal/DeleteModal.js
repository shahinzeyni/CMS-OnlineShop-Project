import React from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

export default function DeleteModal({ submitAction, cancelAction, title }) {
  return ReactDOM.createPortal(
    <div className="modal-parent active">
      <div className="delete-modal">
        <h1>{title}</h1>
        <div className="delete-modal-btns">
          <button
            className="delete-btn delete-modal-accept-btn"
            onClick={() => submitAction()}
          >
            بله
          </button>
          <button
            className="delete-btn delete-modal-reject-btn"
            onClick={() => cancelAction()}
          >
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
