import About from './components/About.js'
import Home from './components/Home'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import IndividualProduct from './components/IndividualProduct'
import Products from './components/Products'
import Shop from './components/Shop.js'
import AppContext from './context/AppContext'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import {useState} from 'react'

function App () {

  const [cartContents, setCartContents] = useState([])
  const [selectedItem, setSelectedItem] = useState('nothing')

  function addToCart(value){
    

    console.log(value)

    if(value > 0){
      
    }
  }

    const x = 3
  
    return (
        <Router>
          <AppContext.Provider value={{cartContents, selectedItem, setSelectedItem, setCartContents,addToCart}}>
            <div className="App">
              <Home></Home>
              <Switch>
                <Route path='/about' exact> <About /> </Route>
                <Route path='/products' exact> <Products /> </Route>
                
                <Route path='/individualProduct' exact> <IndividualProduct /> </Route>
                <Route path='/cart' exact> <Cart /> </Route>
                <Route path='/checkout' exact> <Checkout /> </Route>

              </Switch>
                
                
              
            </div>
        </AppContext.Provider>
        </Router>
    );
  
}

export default App;
