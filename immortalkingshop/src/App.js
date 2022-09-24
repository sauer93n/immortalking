import './App.css';
import './css/normalize.css';
import './css/main.css';
import Header from './components/header/Header';
import ProductGrid from "./components/product-grid/ProductGrid";
import ProductCardModal from "./components/modal/ProductCardModal/ProductCardModal";
import React from "react";
import {v4} from "uuid";
import axios from "axios";
import {Outlet} from "react-router-dom";


class App extends React.Component{
  constructor(props) {
    super(props);
  }


  render(){
    return (
          <div className="App">
            <Header/>
            <main className="content-wrapper">
                <Outlet/>
            </main>
          </div>
    );
  }
}

export default App;
