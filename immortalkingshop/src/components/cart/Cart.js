import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseProductQuantity, increaseProductQuantity } from '../../features/cart/cartSlice'
import './Cart.css';

function Cart(props) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // const changeItemQuantity = (product, action) => {

    //     let products = this.state.cart.slice();

    //     if (action === 'minus' && product.quantity > 0){
    //         product.quantity -= 1;
    //     }
    //     else if (action === 'plus' && product.quantity < 10){
    //         product.quantity += 1;
    //     }

    //     console.log(product);

    //     if (product.quantity === 0){
    //         products = products.filter(item => item._id != product._id);
    //     }

    //     this.setState({
    //         cart: products,
    //     })

    //     localStorage.setItem('cart', JSON.stringify(products));
    // }

    const renderCartItem = (product, index) => {
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
                    <button className='cart-item-quantity-change cart-item-quantity-minus' onClick={() => dispatch(decreaseProductQuantity(product))}>-</button>
                    <span>{product.quantity}</span>
                    <button className='cart-item-quantity-change cart-item-quantity-plus' onClick={() => dispatch(increaseProductQuantity(product))}>+</button>
                </div>
                <div className='cart-item-total-price'>
                    <span>{product.quantity * product.price}</span>
                    <span>RUB</span>
                </div>
            </div>
        )
    }

    let footer = null;

    if (cart !== undefined && cart.length !== 0){
        let totalPrice = cart.products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

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
                {cart.products.map((item, index) => {
                    return renderCartItem(item, index);
                })}
            </div>
            {footer}
            
        </>
        
    );
}

export default Cart;