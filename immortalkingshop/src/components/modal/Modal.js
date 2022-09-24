import React from "react";
import './Modal.css';
import {CSSTransition} from "react-transition-group";

class Modal extends React.Component{

    constructor(props) {
        super(props);

        this.closeOnEscapeKeyDown = this.closeOnEscapeKeyDown.bind(this);
    }

    closeOnEscapeKeyDown(e){
        if ((e.charCode || e.keyCode === 27)){
            this.props.onClose();
        }
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this.closeOnEscapeKeyDown);
    }

    render(){
        return (
            <CSSTransition
                in={this.props.show}
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <div className="modal-window" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {this.props.children}
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Modal;