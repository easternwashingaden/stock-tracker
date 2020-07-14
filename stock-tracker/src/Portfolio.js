import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import Moment from 'react-moment';
import { Button, Container } from 'reactstrap';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state ={
            message: "",
            isLoading : true,
            currentPrices : [],
            results : [],
            Stocks : []
        }
    }

    async getStockArray(){
        const res = await axios.get('/api/stocks');
        this.setState({Stocks: res.data});
        await this.loadPrices(res.data)   
    }

    async componentDidMount(){
        await this.getStockArray();
        const response = await fetch('/api/stocks');
        const body= await response.json();
        this.setState({Stocks : body, isLoading : false});

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
            <td>{stock.ticker}</td>
            <td>{stock.share}</td>
            <td>${stock.price}</td>
            <td>${currentPrices[i]}</td>
            <td>${(stock.share * parseFloat(stock.price)).toFixed(2)}</td>
            <td>${(stock.share * parseFloat(currentPrices[i])).toFixed(2)}</td>
            <td>${(currentPrices[i] - stock.price).toFixed(2)}</td>
            <td>%{((parseFloat(currentPrices[i])/parseFloat(stock.price) - 1)*100).toFixed(2)}</td>
            {/* <td>{((parseFloat(currentPrices[i]) - parseFloat(stock.price)/(stock.share * stock.price))).toFixed(2)}</td> */}
            <td><Moment date = {stock.purchasedDate} format = "YYYY/MM/DD"/></td>
            <td><Button size= 'sm' color='danger' onClick={()=> this.remove(stock.id)}>Delete</Button></td>
            </tr>
            )
          
        return (
            <section>
                <div>
                    <AppNav/>
                    <Container style = {{margin: '2rem'}}>
                        <h3>Stock Collection</h3>
                        <Table className= 'mt-4 table-hover'>
                            <thead className="thead-light">
                            <tr>
                                <th>Ticker</th>
                                <th>Share</th>
                                <th>Purchased Price</th>
                                <th>Current Price</th>
                                <th>Total Cost</th>
                                <th>Total Equity</th>
                                <th>Gain/Loss</th>
                                <th>%Gain/Loss</th>
                                <th>Purchased Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Container>

                </div>
            </section>

        );
    }
}

 
export default Portfolio;