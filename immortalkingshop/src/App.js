import './App.css';
import './css/normalize.css';
import './css/main.css';
import Header from './components/header/Header';
import React from "react";
import {Outlet} from "react-router-dom";


function App(props) {
  return (
        <div className="App">
          <Header/>
          <main className="content-wrapper">
              <Outlet/>
          </main>
          
        </div>
  );
}

export default App;
