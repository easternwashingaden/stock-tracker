import React, { Component } from 'react';
import Stock from './Stock';
import Home from './Home';
import Search from './Search';
import StockForm from './StockForm';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
        <Switch>
          <Route path='/'exact={true} component={Home}/>
          <Route path='/stocks' exact={true} component={Stock}/>
          <Route path='/stock' exact={true} component={StockForm}/>
          <Route path='/search' exact={true} component={Search}/>
        </Switch>
      </Router>
     );
  }
}
 
export default App;