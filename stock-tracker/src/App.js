import React, { Component } from 'react';
import Stock from './Stock';
import Home from './Home';
import StockPerformance from './StockPerformance';
import StockForm from './StockForm';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Portfolio from './Portfolio';
import Sale from './Sale';
import AddCapital from './AddCapital';
import Capital from './Capital';
import About from './About';

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
        <Switch>
          <Route path='/'exact={true} component={Home}/>
          <Route path='/portfolio' exact={true} component={Portfolio}/>
          <Route path='/stocks' exact={true} component={Stock}/>
          <Route path='/stock' exact={true} component={StockForm}/>
          <Route path='/history' exact={true} component={Sale}/>
          <Route path='/stockperformance' exact={true} component={StockPerformance}/>
          <Route path='/capital' exact={true} component={AddCapital}/>
          <Route path='/capitals' exact={true} component={Capital}/>
          <Route path='/about' exact={true} component={About}/>
        </Switch>
      </Router>
     );
  }
}
 
export default App;