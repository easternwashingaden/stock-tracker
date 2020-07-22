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
import CurrencyFormat from 'react-currency-format';


class Portfolio extends Component {

    constructor(props){
        super(props);
        this.state ={
          message: "",
          isLoading : true,
          currentPrices : [],
          results : [],
          Stocks : [],
          capitals: [], 
          sales: [],
          xSales: [],
          ySales:[],
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
        const res = await axios.get('https://tithvorlak-stock-tracker.herokuapp.com/api/stocks');
        this.setState({Stocks: res.data});
        await this.loadPrices(res.data);
        await this.getStockTickers(res.data);
        await this.getTotalCosts(res.data);
    }

    async componentDidMount(){

        await this.getStockArray();
        const response = await fetch('https://tithvorlak-stock-tracker.herokuapp.com/api/stocks');
        const body= await response.json();
        this.setState({Stocks : body, isLoading : false });
        await this.getCapitalArray()
        await this.getSaleArray()
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
      const object = {
        labels: tickerList
      }
      this.setState ({ options: object}); 
      
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
        axios.delete(`https://tithvorlak-stock-tracker.herokuapp.com/api/stock/${id}`)
        .then((response)=>{
            let updatedStocks = [...this.state.Stocks].filter(i => i.id !== id);
            this.setState({Stocks : updatedStocks});
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    async getCapitalArray(){
      const res = await axios.get('https://tithvorlak-stock-tracker.herokuapp.com/api/capitals');
      this.setState({capitals: res.data});  
    }

    async getSaleArray(){
      const res = await axios.get('https://tithvorlak-stock-tracker.herokuapp.com/api/sales');
      this.setState({sales: res.data});  
      const allSales = res.data.map((sale =>{
        return  (sale.share * sale.soldPrice - sale.share * sale.price)
      }))
      console.log(this.allSales);

      const allSoldDates = res.data.map((sale =>{
        return sale.soldDate
      }))

      console.log(this.allSoldDates);
      this.setState({
        xSales: allSales,
        ySales: allSoldDates
      })
    }

    fontColorChange(value){
      return {
        color: (value > 0) ? '#4caf50' : '#e53935'
      }
    }

    render() { 
        const {Stocks, capitals, currentPrices,isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)

        let rows = 
        Stocks.map((stock, i) =>
            <tr key = {stock.id} >
              <td onMouseEnter = {this.handleHoverOn.bind(this, stock.ticker)}>{stock.ticker}</td>
              <td>{stock.share}</td>
              <td>
                <CurrencyFormat value={parseFloat(stock.price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </td>
              <td>
                <CurrencyFormat value={parseFloat(currentPrices[i]).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </td>
              <td>
                <CurrencyFormat value={(stock.share * parseFloat(currentPrices[i])).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </td>
              <td>
                <CurrencyFormat value={(stock.share * parseFloat(stock.price)).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </td>
            </tr>
            )

        let totalCosts = Stocks.map((stock) =>{
          return stock.share * stock.price
        })
        
        const allCapitalValues = capitals.map((capital) =>{
          return capital.value
        })
          
        const sumTotalCost = totalCosts.reduce(function(a, b){
          return a + b;
        }, 0);


        const currentCapitalValue = allCapitalValues.reduce(function(a, b){
          return a + b;
        }, 0);


        //getting the initail capitals

        // getting all the captials where the descriptions are not "Sold stock" && "Purchased stocks"

        const allInitialCapitals = capitals.filter(element => element.description !== "Purchased stocks" && element.description !== "Sold stocks")

        const allInitialCapitalValues = allInitialCapitals.map((capital=>{
          return capital.value
        }))
         
        

        const totalIntialCapital = allInitialCapitalValues.reduce(function(a, b){
          return a + b;
        }, 0);

        const profit = (currentCapitalValue + sumTotalCost) - totalIntialCapital;

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
                        layout={{width: 550, height: 440, title: 'Stock Performance'}}
                        
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
                  <h3 style = {{textAlign: 'center', fontWeight: 'bold'}}>Portfolio</h3>
                  <br></br>
                  <br></br>
                  <div className = "container">
                    <div className="row">
                      <div class="col-8 card">
                      <Container>
                        <h6 className="card-header info-color white-text text-center py-3" style = {{background: "lightblue", fontWeight: 'bold'}} >Investment Summary </h6>
                          <Table className= 'table table-striped table-hover w-atuo small'>
                            <tbody>
                                <tr>
                                  <th>Starting Capital</th>
                                    <td>
                                    <CurrencyFormat value={totalIntialCapital.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                  </td>
                                </tr>
                      
                                <tr>
                                  <th>Stock Purchases/Holdings</th>
                                    <td>
                                      <CurrencyFormat value={sumTotalCost.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>

                                <tr>
                                  <th>Fund Available for Trading</th>
                                    <td>
                                      <CurrencyFormat value={currentCapitalValue.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>

                                <tr>
                                  <th>Gain/Loss</th>
                                    <td className = {profit > 0 ? 'green': 'red'}>
                                    <CurrencyFormat value={profit.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>

                                <tr>
                                  <th>Total Cash Value</th>
                                    <td className = {profit + totalIntialCapital > totalIntialCapital ? 'green': 'red'}>
                                    <CurrencyFormat value={(profit + totalIntialCapital).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>

                            </tbody>
                            
                          </Table>
                        </Container>
                      </div>
                      
                      <div className=" col card">
                        <h6 className="card-header info-color white-text text-center py-3" style = {{background: "lightgray"}}>
                          <strong>Purchased Stocks</strong>
                        </h6>
                        <div>
                          <div className="donut">
                            <Chart 
                              options={this.state.options} 
                              series={this.state.series} 
                              type="donut" 
                              width="300" />
                          </div>
                        </div>
                      </div>

                      <div class="w-100"></div>
                      <div className="col-8" style = {{fontWeight: 'bold'}}>
                        <h6 className = 'center' style = {{marginTop: "2rem", fontWeight: 'bold'}}>Purchased Stocks List</h6>
                        {Stocks.length > 0 ? 
                        <Container className = "border-right">
                          <Table className= 'table table-striped table-hover w-atuo small'>
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
                        </Container>
                        :
                        <p style = {{textAlign: 'center', marginTop: '2rem', fontWeight: 'bold'}}>No Results</p>}
                      </div>
                      <div class="col">
                        <h6 style = {{textAlign: "center" , marginTop: "2rem", fontWeight: 'bold'}}>Sale Graphical History</h6>
                        {this.state.xSales && this.state.ySales.length ? <Plot
                        data={[
                        {
                          x: this.state.ySales,
                          y: this.state.xSales,
                          type: 'bar',
                          mode: 'lines+markers',
                          marker: {color: 'orange'},
                        }
                      ]}
                        layout={{width: 420, height: 490}}
                      />
                      :
                      <p style = {{textAlign: 'center', marginTop: '2rem', fontWeight: 'bold'}}>No Results</p>
                      }
                      </div>
                    </div>
                  </div>
                </div>
            </section>

        );
    }
}

 
export default Portfolio;