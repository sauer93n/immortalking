import React from "react";
import {Button, Form, Image, Modal, Stack} from "react-bootstrap";
import './EditProductModal.css';
import axios from "axios";
import ProductForm from "../ProductForm/ProductForm";

class EditProductModal extends React.Component{
    constructor(props) {
        super(props);

            
        this.sendData = (e, data) => {

            e.preventDefault();

            axios.put('http://localhost:5000/products/' + data._id, data)
                .then(() => {
                    this.props.onSave(data);
                    this.props.onHide();
                });
        }
    }


    render(){

        this.product = this.props.toEdit;

        if (this.product === undefined || this.product === null)
            return null;

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение параметров товара</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ProductForm onSubmit={this.sendData} product={this.product}>

                            <Stack gap={3} direction="horizontal" className="justify-content-end">
                                <Button variant="success" type="submit">
                                    Сохранить
                                </Button>

                                <Button variant="secondary" onClick={this.props.onHide}>
                                    Закрыть
                                </Button>
                            </Stack>
                        </ProductForm>
                </Modal.Body>
            </Modal>
        )
    }
}

export default EditProductModal;