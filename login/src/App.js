import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/* import login form */
import Form from './Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Login</h1>
        </header>
        <Form />
      </div>
    );
  }
}

export default App;
