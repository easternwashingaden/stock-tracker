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
import Chart from "react-apexcharts";

class Portfolio extends Component {

    constructor(props){
        super(props);
        this.state ={
            message: "",
            isLoading : true,
            currentPrices : [],
            results : [],
            Stocks : [], 
            options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                //Stocktickers
                categories: []
              }
            },
            series: [
              {
                //value = share*price
                name: "series-1",
                data: []
              }
            ]
  
          }
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

    getStockTickers(Stocks){
      let tickerList = Stocks.map((stock) =>{
        return stock.ticker
      })

      console.log(tickerList)
      this.setState ({ categories: tickerList});  
      console.log(this.categories)
      
    }

    getTotalCosts(Stocks){
      let totalCosts = Stocks.map((stock) =>{
        return (parseFloat(stock.price) * stock.share)
      })

      console.log(totalCosts)
      this.setState ({data : totalCosts});  
      console.log(this.data)
      
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
        const {Stocks, categories, currentPrices,isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)

        let rows = 
        Stocks.map((stock, i) =>
            <tr key = {stock.id} >
              <td>{stock.ticker}</td>
              <td>{stock.share}</td>
              <td>${currentPrices[i]}</td>
              <td>${(stock.share * parseFloat(currentPrices[i])).toFixed(2)}</td>
            </tr>
            )
          
        return (
            <section>
                <div>
                  <AppNav/>
                  <h3>Stock Collection</h3>
                  <h5 style = {{textAlign: 'center'}}>Portfolio(Value:)</h5>
                  <br></br>
                  <br></br>
                  <div className = "container">
                    <div className="row">
                      <div className="col">
                        <Container className = "border-right">
                        <div className="table-responsive">
                          <Table className= 'table table-striped table-hover center'>
                              <thead style = {{background: "lightseagreen"}}>
                              <tr>
                                  <th>Ticker</th>
                                  <th>Share</th>
                                  <th>Price</th>
                                  <th>Total Equity</th>
                              </tr>
                              </thead>
                              <tbody>
                                  {rows}
                              </tbody>
                            </Table>
                          </div>
                        </Container>
                      </div>
                      <div className="col card" style = {{marginRight: '2em'}}>
                        <h5 className="card-header info-color white-text text-center py-4" style = {{background: "lightseagreen"}}>
                          <strong>Add Stock</strong>
                        </h5>
                        <div className = "card-body px-lg-5">
                        <Container>
                    
                          <Form onSubmit={this.handleSumbit}>
                            <FormGroup className= "md-form mt-3">
                              <lable for='ticker'>Ticker</lable>
                              {/* <select className = "form-control">
                                {optionList}
                              </select> */}
                              
                              <input type='text' name='ticker' id='ticker' className = "form-control" onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup className="form-row">
                              <lable for='share'>Share</lable>
                              <input type='text' name='share' id='share' className = "form-control" onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup className="form-row">
                              <lable for='price'>Purchased Price</lable>
                              <input type='text' name='price' id='price' className = "form-control" onChange={this.handleChange}/>
                            </FormGroup>

                            <div className='row'>
                            <FormGroup className='col-md-4 mb-3'>
                              <lable for='purcashedDate'>Purchased Date</lable>
                              {/* <DatePicker selected={this.state.item.purchasedDate} className = "form-control" onChange={this.handleChange}/> */}
                            </FormGroup>
                            </div>
                              <Button color='primary' type='submit'>Save </Button>{' '}
                              <Button color='secondary' tag={Link} to = '/stocks'>Cancel</Button>
                          </Form>

                        </Container>
                        <div className="app">
                          <div className="row">
                            <div className="mixed-chart">
                              <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="bar"
                                width="500"
                              />
                        </div>
                       </div>
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