import React from 'react';
import Plot from 'react-plotly.js';
import AppNav from './AppNav';
import './StockPerformance.css';
import axios from 'axios';


// Resource: https://www.youtube.com/watch?v=T26V1aSEtJE&t=1381s
class ShowStockDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      message: "",
      isLoading: false,
      stockChartXValues: [],
      stockChartYValues: []
    }
    this.cancel= "";
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }
  
  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ query, loading: true, message: '' } );
    // this.fetchSearchResults(query);
    console.log(query);
    
  };
 
  async handleHoverOn(event){
    event.preventDefault();
    const {query} = this.state;
    console.log(query);

    const pointerToThis = this;
    // console.log(pointerToThis);
    const API_KEY = '6D6O68MT7WRRNJOM';
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${query}&outputsize=compact&apikey=${API_KEY}`;
    console.log(API_Call)
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

  
    this.cancel = axios.CancelToken.source();
    // if (API_Call){
      axios.get(API_Call)
        .then ((res) => {
          console.log(res);
          console.log('successfully here');
          
          this.setState({
            loading: false,
          }); 
          for (var key in res.data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(res.data['Time Series (Daily)'][key]['4. close']);
          }

          console.log(stockChartYValuesFunction);
            pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        })
        .catch((error) => {
          if (axios.isCancel(error) || error) {
            this.setState({
              loading: false,
              message: 'Failed to fetch results.Please check network',
            });
          }
        });
        this.setState({
          query: ""
        });

      // TODO: need to work on the flash message when there is no symby matches
      // }else{
      //   return<h4>The stock symbol does not in the system.</h4>
      // }
    }

  render(){
    const { query } = this.state
    return (
      <section>
        <div>
          <div style = {{margin: '2rem'}}>
            <div>
              <p>📈Please enter the stock symbol </p>
            </div>
            <br></br>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSumbit} >
              <div>
                <input
                  name="title"
                  value={query}
                  onChange = {this.handleChange}
                  type="text"
                  placeholder = "stock symbol..."
                  className= "form-control mr-sm-4" 
                />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </div>
            </form>
          </div>
        {this.state.stockChartXValues && this.state.stockChartYValues.length ? <Plot
          data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
          layout={{width: 720, height: 440, title: 'Stock Performance'}}
        />
        :
        <h2 className="text-center">No Results</h2>
        }
      </div>
    </section>  
    );
  }

}

export default ShowStockDetail;