import React, { useEffect } from "react";
import "./EditModal.css";

export default function EditModal({ children, onClose, onSubmit }) {

    useEffect(() => {
        const checkKey = (event) => {
            console.log(event);
          if (event.keyCode === 13) {
            onClose();
          }
        };
    
        window.addEventListener("keydown", checkKey);
    
        return () => window.removeEventListener('keydown', checkKey)
      });

  return (
    <div className="modal-parent active">
      <form className="edit-modal-form">
        <h1>اطلاعات جدید را وارد نمایید</h1>

        {children}

       <div className="edit-form-submit-parent">
       <button className="edit-form-submit" onClick={onSubmit}>ثبت اطلاعات جدید</button>
        <button  className="edit-form-submit" onClick={onClose} >لغو</button>
       </div>
      </form>
    </div>
  );
}
