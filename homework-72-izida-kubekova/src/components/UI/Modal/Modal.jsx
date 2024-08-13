import React from "react";
import './Modal.css';

const Modal = (props) => {
    return (
        <>
            {props.show ?
                <div className="Modal-background">
                    {props.children}
                </div >
                : null
            }
        </>
    );
};

export default Modal;