import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Route, Routes,
} from 'react-router-dom';
import Cart from "./components/cart/Cart";
import ProductGrid from "./components/product-grid/ProductGrid";
import SignUp from './components/signup/SignUp';
import store from './store';
import {Provider} from 'react-redux';
import Login from './components/login/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}>
                  <Route index element={<ProductGrid/>}></Route>
                  <Route path="cart/">
                      <Route index element={<Cart/>}></Route>
                  </Route>
                  <Route path="signup/">
                      <Route index element={<SignUp/>}></Route>
                  </Route>
                  <Route path="login/">
                      <Route index element={<Login/>}></Route>
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
