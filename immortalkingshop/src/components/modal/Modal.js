import React, {useEffect} from "react";
import './Modal.css';
import {CSSTransition} from "react-transition-group";

function Modal(props) {
    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    });

    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode === 27)){
            props.onClose();
        }
    }

    return (
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={200}
            classNames="modal"
        >
            <div className="modal-window" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </CSSTransition>
    )
}

export default Modal;