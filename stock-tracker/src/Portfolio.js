import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import './Portfolio.css';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Link} from 'react-router-dom';
import  Chart from "react-apexcharts";
import Plot from 'react-plotly.js';


class Portfolio extends Component {

    constructor(props){
        super(props);
        this.state ={
          message: "",
          isLoading : true,
          currentPrices : [],
          results : [],
          Stocks : [], 
          options: {},
          isOnShowDetailMode: false,
          stockChartXValues: [],
          stockChartYValues: [],
          hoveredStock: null,
          series: [],
          options: {
           labels: [],     
        }
      }
      this.handleHoverOn = this.handleHoverOn.bind(this); 
      
    }

  handleHoverOn(ticker){
    // this.setState({hoveredStock : stock})
    // const {hoveredStock} = this.state;
   console.log(ticker)

    const pointerToThis = this;
    // console.log(pointerToThis);
    const API_KEY = '6D6O68MT7WRRNJOM';
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`;
    console.log(API_Call)
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

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
      this.setState({isOnShowDetailMode : true})
    }

    async getStockArray(){
        const res = await axios.get('/api/stocks');
        this.setState({Stocks: res.data});
        await this.loadPrices(res.data);
        await this.getStockTickers(res.data);
        await this.getTotalCosts(res.data);
    }

    async componentDidMount(){

        await this.getStockArray();
        const response = await fetch('/api/stocks');
        const body= await response.json();
        this.setState({Stocks : body, isLoading : false });
    }

    getTotalCosts(Stocks){
      let totalCosts = Stocks.map((stock) =>{
        return (parseFloat(stock.price) * stock.share)
      })

      console.log(totalCosts)
      this.setState ({series: totalCosts});  
      console.log(this.series)
      
    }

    getStockTickers(Stocks){
      let tickerList = Stocks.map((stock) =>{
        return stock.ticker
      })

      console.log(tickerList)
      this.setState ({ labels: tickerList});  
      console.log(this.categories)
      
    }

    async loadPrices(tickers){
        const API_KEY = '6D6O68MT7WRRNJOM';
        axios.all(tickers.map(stock => axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock.ticker}&outputsize=compact&apikey=${API_KEY}`)))
            .then (axios.spread((...res) => {
                console.log(res);
                
                const latestPrices = res.map(element =>{
                    for (var key in element.data['Time Series (Daily)']) {
                        const allPrices = element.data['Time Series (Daily)'][key]['4. close']; 
                        console.log(allPrices)
                        return allPrices
                    }  
                })   
                this.setState({ currentPrices: latestPrices, isLoading : false })   
            }))

            .catch((error) =>{
                console.log(error)

            })        
    }

    async remove(id){
        axios.delete(`/api/stock/${id}`)
        .then((response)=>{
            let updatedStocks = [...this.state.Stocks].filter(i => i.id !== id);
            this.setState({Stocks : updatedStocks});
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    render() { 
        const {Stocks, currentPrices,isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)

        let rows = 
        Stocks.map((stock, i) =>
            <tr key = {stock.id} >
              <td onMouseEnter = {this.handleHoverOn.bind(this, stock.ticker)}>{stock.ticker}</td>
              <td>{stock.share}</td>
              <td>${parseFloat(stock.price).toFixed(2)}</td>
              <td>${currentPrices[i]}</td>
              <td>${(stock.share * parseFloat(currentPrices[i])).toFixed(2)}</td>
              <td>${(stock.share * parseFloat(stock.price)).toFixed(2)}</td>
            </tr>
            )
          
        return (
            <section>
                <div>
                  <AppNav/>
                  <div>
                  {this.state.isOnShowDetailMode && this.state.stockChartXValues && this.state.stockChartYValues.length  ?
                  <div>
                    <div className = "center">
                      <Plot
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
                      </div>
                      <div className = "center"> 
                        <Button className = "center" color='danger' style ={{textAlign: 'center'}} onClick ={(e)=> this.setState({isOnShowDetailMode: false})}>Close</Button> 
                      </div>
                    </div>
                  : ""
                  
                  }
                  
                  </div>

                  <br></br>
                  <br></br>
                  <h5 style = {{textAlign: 'center'}}>Portfolio(Value:)</h5>
                  <br></br>
                  <br></br>
                  <div className = "container">
                    <div className="row">
                      <div className="col-sm-8">
                        <Container className = "border-right">
                        <div className="table-responsive">
                          <Table className= 'table table-striped table-hover center'>
                              <thead style = {{background: "lightseagreen"}}>
                              <tr>
                                  <th>Ticker</th>
                                  <th>Share</th>
                                  <th>Purchased Price</th>
                                  <th>Current Price</th>
                                  <th>Total Equity</th>
                                  <th>Total Cost</th>
                              </tr>
                              </thead>
                              <tbody>
                                  {rows}
                              </tbody>
                            </Table>
                          </div>
                        </Container>
                      </div>
                      <div className=" col-6 col-md-4 card">
                        <h5 className="card-header info-color white-text text-center py-4" style = {{background: "lightseagreen"}}>
                          <strong>Purchased Stocks</strong>
                        </h5>
                        <div>
                          <div className="donut">
                            <Chart 
                              options={this.state.options} 
                              series={this.state.series} 
                              type="donut" 
                              width="380" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>

        );
    }
}

 
export default Portfolio;