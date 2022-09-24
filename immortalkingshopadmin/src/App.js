import logo from './logo.svg';
import './App.css';
import AddProduct from "./components/AddProduct/AddProduct";
import NavBar from "./components/NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/*<AddProduct/>*/}
        <Outlet/>
    </div>
  );
}

export default App;
