import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Home from './components/Home/Home';
import Shipment from './components/Shipment/Shipment';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route path="/shop">
            <Home></Home>
          </Route>
          <Route path="/order">
            <Order></Order>
          </Route>
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route path="/Login">
            <LogIn />
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route> 
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>          
          <Route path="*">
            <NotFound></NotFound>
          </Route>                   
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
