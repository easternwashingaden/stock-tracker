
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios'; 
// import ReactNotification, { store } from 'react-notifications-component'
import Customers from './components/Stocks';

const App= () => {
  const [ stockList, setStockList ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const getStocks = useCallback(() => {
    axios.get('http://localhost:8080/api/stocks')
    .then((response) => {
      setStockList(response.data);
    })
    .catch((error) => {
      setErrorMessage(Object.values(error.response.data.errors));
    });
  }, []);

  return (

    <Router>
      <nav className="navbar navbar-expand-lg navbar-light" id ="background-color">
        <a href="#"><img src = "https://i.imgur.com/3CsrAvY.jpg" className= "App-logo" alt = "logo"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="App-nav-links__item font-color">Home</Link>
            </li>

            <li className="nav-item">
              <Link to="/stocks" className="App-nav-links__item font-color">Stocks</Link>
            </li>

            <li className="nav-item">
              <Link to="/search" className="App-nav-links__item font-color">Stock Search</Link>
            </li>

          </ul>
        </div>
    </nav>
 
        {/* <section className="App-errors">
          <ReactNotification />
        </section> */}

    <main className="App-content">
      <Switch>
      <Route path="/search">
          {/* <Search results={searchResults} onSearchMovieCallback={searchMovies} addMovieCallback={addMovie} /> */}
        </Route>
        <Route path="/stock search">
          {/* <Movies list={movieList} onSelectCallback={selectMovie} /> */}
        </Route>
        <Route path="/stocks">
          {/* <Customers list={customerList} onSelectCallback={selectCustomer} /> */}
        </Route>
      </Switch>
    </main>
  </Router>
  );
}

export default App;
