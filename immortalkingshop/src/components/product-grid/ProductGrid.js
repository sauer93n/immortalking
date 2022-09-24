import React from "react";
import './ProductGrid.css';
import ProductCardModal from "../modal/ProductCardModal/ProductCardModal";
import axios from "axios";

class ProductGrid extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            products: [],
            modal: {
                show: false,
                toShowProduct: {
                    picture: "placeholder.png",
                    name: "placeholder",
                    type: "placeholder",
                    desc: "placeholder",
                    bigPicture: "placeholder_415px.png",
                    printType: "placeholder",
                    cutType: "placeholder",
                    clothType: "placeholder",
                    sizes: {},
                },
            }
        }

        this.loadProducts();
    }


    async loadProducts(){
        await axios.get("http://localhost:5000/products")
            .then((data) => this.setState({
                products: data.data,
            }));
    }

    setShow(state){
        this.setState(
            {
                modal: {
                    show: state,
                    toShowProduct: this.state.modal.toShowProduct,
                }
            }
        )
    }

    showModalFor(product){

        this.setState(
            {
                modal: {
                    toShowProduct: {...product, defaultSize: Object.keys(product.sizes).filter(item => product.sizes[item])[0]},
                    show: true,
                }
            }
        );
    }

    renderProductCard(product, key){
        return (
            <div className="product-card" key={key} onClick={() => this.showModalFor(product)}>
                <div className="product-card__image">
                    <img src={'http://localhost:5000/' + product.picture} alt=""/>
                </div>
                <span className="product-card__name">{product.name}</span>
            </div>
        )
    }

    renderNothingInStock(){
        return (
            <div className="nothing-in-stock">
                <span>
                    Нихуя нет товаров, браток, пиздец :(
                </span>
            </div>
        )
    }

    render(){
        const products = this.state.products;

        let productList;
        if (products === undefined || products.length === 0)
        {
            productList = this.renderNothingInStock();
        }
        else{
            productList =
                <div className="products">
                    {
                        products.map((product, index) => {
                            return this.renderProductCard(product, index);
                        })
                    }
                </div>
        }

        return (
            <>
                {productList}
                <ProductCardModal onClose={() => this.setShow(false)} show={this.state.modal.show} toShow={this.state.modal.toShowProduct}/>
            </>
        )
    }
}


export default ProductGrid;