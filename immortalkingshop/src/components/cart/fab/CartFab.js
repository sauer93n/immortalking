import React from 'react';
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './CartFab.css';


class CartFab extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Fab color="primary" aria-label="add" className="cart-fab">
                <AddIcon />
            </Fab>
        )
    }
}


export default CartFab;