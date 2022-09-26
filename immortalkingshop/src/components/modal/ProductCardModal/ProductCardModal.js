import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setSelectedSize } from "../../../features/cart/cartSlice"
import Modal from "../Modal";
import './ProductCardModal.css';


function ProductCardModal(props) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const prepareForClose = () => {
        dispatch(setSelectedSize(null));

        props.onClose();
    }

    return (
        <Modal onClose={() => prepareForClose()} show={props.show}>
            <div className="product-card-modal-wrapper">
                <div className="product-card-modal-content">
                    <div className="product-card-modal-view">
                        <div className="product-card-modal-view-main-image">
                            <img src={'http://localhost:5000/' + props.toShow.bigPicture} alt=""/>
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
                            {props.toShow.name}
                        </div>
                        <div className="product-card-modal-info-type">
                            {props.toShow.type}
                        </div>
                        <div className="product-card-modal-info-desc">
                            <p className="product-card-modal-info-desc-paragraph">{props.toShow.desc}</p>
                        </div>

                        <div className="product-card-modal-info-manufacturing">
                            <div className="product-card-modal-info-printType">
                                <div className="product-card-modal-info-icon">
                                    <img src={require('../../../icons/print-type-icon.png')} alt=""/>
                                </div>
                                <div className="product-card-modal-info-printType-name">
                                    {props.toShow.printType}
                                </div>
                            </div>
                            <div className="product-card-modal-info-clothType">
                                <div className="product-card-modal-info-icon">
                                    <img src={require('../../../icons/cloth-type-icon.png')} alt=""/>
                                </div>
                                <div className="product-card-modal-info-clothType-name">
                                    {props.toShow.clothType}
                                </div>
                            </div>
                            <div className="product-card-modal-info-cutType">
                                <div className="product-card-modal-info-icon">
                                    <img src={require('../../../icons/cut-type-icon.png')} alt=""/>
                                </div>
                                <div className="product-card-modal-info-cutType-name">
                                    {props.toShow.cutType}
                                </div>
                            </div>
                        </div>


                        <div className="product-card-modal-info-sizes">
                            {Object.keys(props.toShow.sizes).filter(item => props.toShow.sizes[item]).map((key, index) => {
                                return (
                                    <button key={index} 
                                        className={
                                            (cart.selectedSize || props.toShow.defaultSize) === key ? "size-choose active" : "size-choose"
                                        }
                                        onClick={() => dispatch(setSelectedSize(key))}>
                                            {key}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="product-card-modal-info-buy-actions">
                            <a className="fast-buy-link">
                                <div>Быстрая покупка</div>
                            </a>
                            <button className="get-in-cart" onClick={() => dispatch(addProduct(props.toShow, props.onClose()))}>В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProductCardModal;