import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    toShowProduct: {
        picture: 'placeholder.png',
        name: 'placeholder',
        type: 'placeholder',
        desc: 'placeholder',
        bigPicture: 'placeholder_415px.png',
        printType: 'placeholder',
        cutType: 'placeholder',
        clothType: 'placeholder',
        sizes: {},
    }
}

export const productModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShow: (state, data) => {
        state.show = data.payload
    },
    showModalFor: (state, product) => {
        state.toShowProduct = {...product.payload, defaultSize: Object.keys(product.payload.sizes).filter(item => product.payload.sizes[item])[0]};
        state.show = true;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setShow, showModalFor } = productModalSlice.actions

export default productModalSlice.reducer