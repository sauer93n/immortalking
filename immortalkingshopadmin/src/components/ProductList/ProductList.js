import React from "react";
import './ProductList.css';
import {Button, Card, Col, Container, Modal, Row, Stack} from "react-bootstrap";
import EditProductModal from "../EditProductModal/EditProductModal";
import axios from "axios";

class ProductList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            toDelete: null,
            deleteVerifyModal: {
                show: false,
            },
            editProductModal: {
                show: false,
                toEdit: null,
            }
        }

        this.changeProductState = this.changeProductState.bind(this);
    }

    prepareToEdit(product){
        this.setState({
            editProductModal: {
                show: true,
                toEdit: product,
            }
        });
    }

    prepareToDelete(id){
        this.setState({
            toDelete: id,
        });
    }

    verifyDeleteShow(show){
        this.setState({
            deleteVerifyModal: {
                show: show,
            }
        });
    }

    editProductShow(show){
        this.setState({
            editProductModal: {
                show: show,
            }
        });
    }

    async loadProducts(){
        await axios.get('http://localhost:5000/products')
            .then(data => this.setState({
                products: data.data,
            }));
    }

     deleteItem(id){
        axios.delete('http://localhost:5000/products/' + id)
            .then(() => {
                let products = this.state.products.slice().filter(product => product._id !== id);

                this.setState({
                    products: products,
                    deleteVerifyModal: {
                        show: false,
                    },
                    toDelete: null,
                });
            });
    }

    changeProductState(product){
        let products = this.state.products.slice().filter(item => item._id !== product._id);

        products.push(product);

        this.setState({
            products: products,
        })
    }

    componentDidMount() {
        this.loadProducts();
    }

    render(){
        return (
            <Container>
                <Row xs={1} md={2} xl={4} className="g-4">
                    {this.state.products.map((product, index) => (
                        <Col key={index}>
                            <Card>
                                <Card.Img variant="top" src={"http://localhost:5000/" + product.picture} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        {product.desc}
                                    </Card.Text>
                                    <Stack direction="horizontal" gap={3}>
                                        <Button variant="primary" onClick={() => { this.prepareToEdit(product) }}>Изменить</Button>
                                        <Button variant="danger" onClick={() => { this.verifyDeleteShow(true); this.prepareToDelete(product._id) }}>Удалить</Button>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <EditProductModal toEdit={this.state.editProductModal.toEdit} show={this.state.editProductModal.show} onHide={() => this.editProductShow(false)} onSave={product => this.changeProductState(product)}/>

                <Modal show={this.state.deleteVerifyModal.show} onHide={() => this.verifyDeleteShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение удаления</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы уверены, что хотите удалить товар?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.deleteItem(this.state.toDelete)}>
                            Подтвердить удаление
                        </Button>
                        <Button variant="secondary" onClick={() => this.verifyDeleteShow(false)}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }

}

export default ProductList;