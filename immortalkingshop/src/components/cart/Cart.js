import axios from 'axios';
import React from 'react';
import './Cart.css';

class Cart extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
        }
    }

    componentDidMount(){
        let cart = [];

        if (localStorage.getItem('cart') !== null){
            JSON.parse(localStorage.getItem('cart')).map(
                item => {
                    axios.get("http://localhost:5000/products/" + item._id)
                        .then((data) => cart.push({...data.data, ...item}))
                        .then(() => this.setState({
                            cart: cart,
                        }));
                }
            );
        }
        else{
            this.setState({
                cart: cart,
            })
        }
    }

    changeItemQuantity(product, action){

        let products = this.state.cart.slice();

        if (action === 'minus' && product.quantity > 0){
            product.quantity -= 1;
        }
        else if (action === 'plus' && product.quantity < 10){
            product.quantity += 1;
        }

        console.log(product);

        if (product.quantity === 0){
            products = products.filter(item => item._id != product._id);
        }

        this.setState({
            cart: products,
        })

        localStorage.setItem('cart', JSON.stringify(products));
    }

    renderCartItem(product, index){
        return (
            <div className='cart-item-wrapper' key={index}>
                <div className='cart-item-info'>
                    <div className='cart-item-image'>
                        <img src={'http://localhost:5000/' + product.picture}>
                        </img>
                    </div>
                    <div className='cart-item-name'>
                        <span>{product.name}</span>
                    </div>
                    <div className='cart-item-size'>
                        <span>{product.selectedSize}</span>
                    </div>
                </div>
                <div className='cart-item-quantity'>
                    <button className='cart-item-quantity-change cart-item-quantity-minus' onClick={() => this.changeItemQuantity(product, 'minus')}>-</button>
                    <span>{product.quantity}</span>
                    <button className='cart-item-quantity-change cart-item-quantity-plus' onClick={() => this.changeItemQuantity(product, 'plus')}>+</button>
                </div>
                <div className='cart-item-total-price'>
                    <span>{product.quantity * product.price}</span>
                    <span>RUB</span>
                </div>
            </div>
        )
    }

    render(){
        
        let footer = null;

        if (this.state.cart !== undefined && this.state.cart.length !== 0){
            let totalPrice = this.state.cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

            footer = (<div className='cart-list-footer'>
                        <div className='cart-total-price'>
                            <span>Итого: </span>
                            <span>{totalPrice}</span>
                            <span>RUB</span>
                        </div>
                        <button className='cart-list-checkout'>Оформить</button>
                    </div>);
        }
        else{
            footer = (
                <span>Корзина пуста</span>
            )
        }

        return (
            <>
                <div className='cart-item-list'>
                    {this.state.cart.map((item, index) => {
                        return this.renderCartItem(item, index);
                    })}
                </div>
                {footer}
                
            </>
            
        );
    }
}

export default Cart;