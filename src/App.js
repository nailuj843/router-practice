import About from './About.js'
import Shop from './Shop.js'
import Nav from './Nav.js'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
          <Nav />
          <Shop />
          <About /> 
      </div>
    );
  }
}

export default App;
