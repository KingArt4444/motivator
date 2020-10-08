import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap-4.4.1-dist/css/bootstrap.min.css';
import KurswatchApp from './component/KurswatchApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <KurswatchApp />
      </div>
    );
  }
}

export default App;
