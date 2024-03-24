import React, { useEffect } from "react";
import "./DetailsModal.css";

export default function DetailsModal({children, onHide}) {
  useEffect(() => {
    const keyDown = event => {
      console.log(event);
      if (event.keyCode === 13) {
        onHide();
      }
    };
    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  });
  return (
    <div className="modal-parent active">
      <div className="details-modal">
        {children}
        <button className="detialBtn" onClick={onHide} >بستن</button>
      </div>
    </div>
  );
}
