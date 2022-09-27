import React from 'react';
import './ProductGrid.css';
import ProductCardModal from '../modal/ProductCardModal/ProductCardModal';
import { useGetAllProductsQuery } from '../../features/products/productsSlice';
import { setShow, showModalFor } from '../../features/productModal/productModalSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductGrid(props) {
    const {data, error, isLoading} = useGetAllProductsQuery();

    const modal = useSelector(state => state.productModal);
    const dispatch = useDispatch();

    const renderProductCard = (product, key) => {
        return (
            <div className='product-card' key={key} onClick={() => dispatch(showModalFor(product))}>
                <div className='product-card__image'>
                    <img src={'http://localhost:5000/' + product.picture} alt=''/>
                </div>
                <span className='product-card__name'>{product.name}</span>
            </div>
        )
    }

    const renderNothingInStock = () => {
        return (
            <div className='nothing-in-stock'>
                <span>
                    Нихуя нет товаров, браток, пиздец :(
                </span>
            </div>
        )
    }

    let productList;
    if (error || isLoading)
    {
        productList = renderNothingInStock();
    }
    
    if (data){
        const products = data;

        productList =
            <div className='products'>
                {
                    products.map((product, index) => {
                        return renderProductCard(product, index);
                    })
                }
            </div>
    }


    return (
        <>
            {productList}
            <ProductCardModal onClose={() => dispatch(setShow(false))} show={modal.show} toShow={modal.toShowProduct}/>
        </>
    )
}


export default ProductGrid;