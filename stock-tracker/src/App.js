import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (


    <nav className="navbar navbar-expand-lg navbar-light" id ="background-color">
    <a href="#"><img src = "https://i.imgur.com/3CsrAvY.jpg" className= "App-logo" alt = "logo"/></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Stocks</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Search</a>
        </li>
      </ul>
    </div>
</nav>
  );
}

export default App;
