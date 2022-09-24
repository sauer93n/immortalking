import React from "react";
import Modal from "../Modal";
import './ProductCardModal.css';

class ProductCardModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            selectedSize: null,
        }
    }

    cartHasItem(product){
        let cart = this.state.cart.slice();

        for (let index in cart){
            let item = cart[index];

            if (item._id === product._id && item.selectedSize === product.selectedSize)
                return true;
        }

        return false;
    }

    selectSize(size){
        this.setState({
            selectedSize: size,
        })
    }

    addToCart(product){
        let newCart = this.state.cart.slice();

        let quantifiedProduct = {
            ...product,
            quantity: 1,
            selectedSize: this.state.selectedSize || product.defaultSize,
        }

        if (this.cartHasItem(quantifiedProduct)){
            newCart.find(item => (item._id === quantifiedProduct._id && item.selectedSize === quantifiedProduct.selectedSize)).quantity += 1;
        }
        else{
            newCart.push(quantifiedProduct);
        }

        this.setState({
            cart: newCart,
            selectedSize: null,
        });

        localStorage.setItem('cart', JSON.stringify(newCart));

        this.props.onClose();
    }

    componentDidMount(){
        if (localStorage.getItem('cart') === null){
            this.setState({
                cart: [],
            })
        }
        else{      
            this.setState({
                cart: JSON.parse(localStorage.getItem('cart')),
            })
        }
    }

    prepareForClose(){
        this.setState({
            selectedSize: null,
        })

        this.props.onClose();
    }

    render(){
        return (
            <Modal onClose={() => this.prepareForClose()} show={this.props.show}>
                <div className="product-card-modal-wrapper">
                    <div className="product-card-modal-content">
                        <div className="product-card-modal-view">
                            <div className="product-card-modal-view-main-image">
                                <img src={'http://localhost:5000/' + this.props.toShow.bigPicture} alt=""/>
                            </div>
                            <div className="product-card-modal-view-other-images">
                                <div className="product-card-modal-view-thumbnail">
                                    <img src={require('../../../img/akashi_red_thumb_1.png')} alt=""/>
                                </div>
                                <div className="product-card-modal-view-thumbnail">
                                    <img src={require('../../../img/akashi_red_thumb_2.png')} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="product-card-modal-info">
                            <div className="product-card-modal-info-name">
                                {this.props.toShow.name}
                            </div>
                            <div className="product-card-modal-info-type">
                                {this.props.toShow.type}
                            </div>
                            <div className="product-card-modal-info-desc">
                                <p className="product-card-modal-info-desc-paragraph">{this.props.toShow.desc}</p>
                            </div>

                            <div className="product-card-modal-info-manufacturing">
                                <div className="product-card-modal-info-printType">
                                    <div className="product-card-modal-info-icon">
                                        <img src={require('../../../icons/print-type-icon.png')} alt=""/>
                                    </div>
                                    <div className="product-card-modal-info-printType-name">
                                        {this.props.toShow.printType}
                                    </div>
                                </div>
                                <div className="product-card-modal-info-clothType">
                                    <div className="product-card-modal-info-icon">
                                        <img src={require('../../../icons/cloth-type-icon.png')} alt=""/>
                                    </div>
                                    <div className="product-card-modal-info-clothType-name">
                                        {this.props.toShow.clothType}
                                    </div>
                                </div>
                                <div className="product-card-modal-info-cutType">
                                    <div className="product-card-modal-info-icon">
                                        <img src={require('../../../icons/cut-type-icon.png')} alt=""/>
                                    </div>
                                    <div className="product-card-modal-info-cutType-name">
                                        {this.props.toShow.cutType}
                                    </div>
                                </div>
                            </div>


                            <div className="product-card-modal-info-sizes">
                                {Object.keys(this.props.toShow.sizes).filter(item => this.props.toShow.sizes[item]).map((key, index) => {
                                    return (
                                        <button key={index} 
                                            className={
                                                (this.state.selectedSize || this.props.toShow.defaultSize) === key ? "size-choose active" : "size-choose"
                                            }
                                            onClick={() => this.selectSize(key)}>
                                                {key}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="product-card-modal-info-buy-actions">
                                <a className="fast-buy-link">
                                    <div>Быстрая покупка</div>
                                </a>
                                <button className="get-in-cart" onClick={() => this.addToCart(this.props.toShow)}>В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ProductCardModal;