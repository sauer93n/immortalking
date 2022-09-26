import { createSlice } from '@reduxjs/toolkit'

function hasItem(cart, product) {
    for (let index in cart){
        let item = cart[index];

        if (item._id === product._id && item.selectedSize === product.selectedSize)
            return true;
    }

    return false;
}

function findProduct(cart, product) {
    return cart.find(item => isEqual(item, product));
}

function isEqual(product1, product2){
    return (product1._id === product2._id && product1.selectedSize === product2.selectedSize);
}

function persistCart(cart) {
    localStorage.setItem('cart', cart);
}

const initialState = {
    products: JSON.parse(localStorage.getItem('cart')) || [],
    selectedSize: null,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, product) => {
        let quantifiedProduct = {
            ...product.payload,
            quantity: 1,
            selectedSize: state.selectedSize || product.payload.defaultSize,
        }

        if (hasItem(state.products, quantifiedProduct)){
            // state.products.find(item => (item._id === quantifiedProduct._id && item.selectedSize === quantifiedProduct.selectedSize)).quantity += 1;
            findProduct(state.products, quantifiedProduct).quantity += 1;
        }
        else{
            state.products.push(quantifiedProduct);
        }

        state.selectedSize = null;

        persistCart(JSON.stringify(state.products));
    },
    increaseProductQuantity: (state, product) => {
        let found = findProduct(state.products, product.payload);

        if (found.quantity >= 10){
            return;
        }

        found.quantity += 1;

        persistCart(JSON.stringify(state.products));
    },
    decreaseProductQuantity: (state, product) => {
        let found = findProduct(state.products, product.payload);

        found.quantity -= 1;

        if (found.quantity <= 0) {
            state.products = state.products.filter(item => !isEqual(item, found));
        }

        persistCart(JSON.stringify(state.products));
    },
    removeProduct: (state, product) => {
        state.products = state.products.filter(item => !isEqual(item, product));

        persistCart(JSON.stringify(state.products));
    },
    setSelectedSize: (state, size) => {
        state.selectedSize = size.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, setSelectedSize, increaseProductQuantity, decreaseProductQuantity } = cartSlice.actions

export default cartSlice.reducer