import React from "react";
import {Button, Form, FormCheck} from "react-bootstrap";
import axios from "axios";


class ProductForm extends React.Component{
    constructor(props){
        super(props);

        if (props.product !== undefined){
            this.state = {...props.product};
        }
        else{   
            this.state = {
                picture: "",
                type: "t-shirt",
                desc: "",
                name: "",
                bigPicture: "",
                printType: "silkscreen",
                cutType: "straight",
                clothType: "",
                price: 0,
                sizes: {
                    XS: false,
                    S: false,
                    M: false,
                    L: false,
                    XL: false,
                },
            }
        }

        this.productTypes = [
            { label: "Футболка", type: "t-shirt"},
            { label: "Худи", type: "hoodie"},
            { label: "Лонгслив", type: "longsleave"},
            { label: "Трусы", type: "underpants"},
        ]
    }

    changeFormState(e){
        if (e.target.id === "picture" || e.target.id === "bigPicture") {
            this.setState({
                [e.target.id]: e.target.files[0]
            });
        }
        else if (e.target.id === "sizes"){

            let newSizes = structuredClone(this.state.sizes);

            newSizes[e.target.value] = e.target.checked;

            this.setState((prevState) => {
                return {
                    ...prevState,
                    sizes: newSizes,
                }
            })
        }
        else{
            this.setState({
                [e.target.id]: e.target.value
            });
        }
    }

    render() {

        return (
            <Form onSubmit={e => this.props.onSubmit(e, this.state)} onChange={e => this.changeFormState(e)}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Название продукта: </Form.Label>
                        <Form.Control required type="text" placeholder="Название" defaultValue={this.state.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="desc">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control required as="textarea" rows={2} type="text" placeholder="Описание" defaultValue={this.state.desc}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control type="number" placeholder="0" defaultValue={this.state.price}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="sizes">
                        <FormCheck.Label>Доступные размеры: </FormCheck.Label>
                        <br/>
                        <Form.Check 
                            inline
                            type='checkbox'
                            id='sizes'
                            value='XS'
                            label='XS'
                            defaultChecked={this.state.sizes['XS']}
                        />
                        <Form.Check 
                            inline
                            type='checkbox'
                            id='sizes'
                            value='S'
                            label='S'
                            defaultChecked={this.state.sizes['S']}
                        />
                        <Form.Check 
                            inline
                            type='checkbox'
                            id='sizes'
                            value='M'
                            label='M'
                            defaultChecked={this.state.sizes['M']}
                        />
                        <Form.Check 
                            inline
                            type='checkbox'
                            id='sizes'
                            value='L'
                            label='L'
                            defaultChecked={this.state.sizes['L']}
                        />
                        <Form.Check 
                            inline
                            type='checkbox'
                            id='sizes'
                            value='XL'
                            label='XL'
                            defaultChecked={this.state.sizes['XL']}
                        />
                    </Form.Group>

                    <Form.Group controlId="type" className="mb-3">
                        <Form.Label>Тип продукта: </Form.Label>
                        <Form.Select defaultValue={this.state.type}>
                            <option value="t-shirt">Футболка</option>
                            <option value="hoodie">Худи</option>
                            <option value="longsleave">Лонгслив</option>
                            <option value="underpants">Трусы</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="picture" className="mb-3">
                        <Form.Label>Фото на превью (240 на 240)</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>

                    <Form.Group controlId="bigPicture" className="mb-3">
                        <Form.Label>Фото для модалки (415 на 415)</Form.Label>
                            <Form.Control type="file"/>
                    </Form.Group>

                    <Form.Group controlId="printType" className="mb-3">
                        <Form.Label>Тип принта: </Form.Label>
                        <Form.Select defaultValue={this.state.printType}>
                            <option value="silkscreen">Шелкография</option>
                            <option value="thermprint">Термонаклейка</option>
                            <option value="sublime">Сублимационная печать</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="cutType" className="mb-3">
                        <Form.Label>Тип кроя: </Form.Label>
                        <Form.Select required defaultValue={this.state.cutType}>
                            <option value="straight">Прямой</option>
                            <option value="oversize">Оверсайз</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="clothType">
                        <Form.Label>Тип ткани: </Form.Label>
                        <Form.Control required as="textarea" rows={2} type="text" placeholder="Тип ткани" defaultValue={this.state.clothType}/>
                    </Form.Group>

                    {this.props.children}
                </Form>
        )
    }
}

export default ProductForm;