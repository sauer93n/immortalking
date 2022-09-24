import React from "react";
import {Button, Container, Form, FormCheck, Toast, ToastContainer} from "react-bootstrap";
import {CSSTransition} from "react-transition-group";
import "./AddProduct.css";
import ProductForm from "../ProductForm/ProductForm";
import axios from "axios";


class AddProduct extends React.Component{
    constructor(props) {
        super(props);

        this.state = {            
            toastShow: false,
            toastMessage: "",
            toastStatus: "",
        }

        this.onSuccess = this.onSuccess.bind(this);
        this.onFail = this.onFail.bind(this);
    }

    onSuccess(e){
        this.setState({
            toastShow: true,
            toastMessage: "Товар добавлен",
            toastStatus: "success",
        });

        e.target.reset();
    }

    onFail(e){
        this.setState({
            toastShow: true,
            toastMessage: "Произошла ошибка",
            toastStatus: "failed",
        });
    }

    sendData(e, data){
        e.preventDefault();

        const formData = new FormData();

        // Update the formData object
        formData.append(
            "picture",
            data.picture,
            data.picture.name
        );

        formData.append(
            "bigPicture",
            data.bigPicture,
            data.bigPicture.name
        );

        const json = JSON.stringify(data);

        const blob = new Blob([json], {
            type: 'application/json',
        });

        formData.append("json", blob);

        axios.post("http://localhost:5000/products", formData)
            .then(() => {
                this.onSuccess(e);
            })
            .catch(err => {
                this.onFail(e);
            });
    }

    render() {
        return (
            <Container className={"add-product-container"}>
                
                <ProductForm onSuccess={this.onSuccess} onFail={this.onFail} onSubmit={this.sendData}>
                    <Button variant="primary" type="submit">
                        Добавить товар
                    </Button>
                </ProductForm>

                <ToastContainer position="bottom-end">
                    <Toast bg={this.state.toastStatus === "success" ? "success" : "danger"} className="add-product-toast-msg" onClose={() => this.setState({toastShow: false})} autohide delay={3000} show={this.state.toastShow}>
                        <Toast.Header>
                            <strong className="me-auto">Уведомление</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {this.state.toastMessage}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>



            </Container>
        )
    }
}

export default AddProduct;