import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import Moment from 'react-moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import AddSale from './AddSale';
import {Form, FormGroup, Button, Container } from 'reactstrap'
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import './App.css'

class Stock extends Component {
    emptySaleItem = {
        ticker: "",
        share: null,
        price: null,
        purchasedDate : new Date(),
        soldPrice: null, 
        soldDate: new Date(),
        users: [2,"Aden","Aden@john.com"]
      }
    emptyItem = {
        price: null,
        purchasedDate : new Date(),
        share: null,
        ticker: "",
        users: [2,"Aden","Aden@john.com"]
    }
    constructor(props){
        super(props);
        this.state ={
            message: "",
            isLoading : true,
            currentPrices : [],
            Stocks : [], 
            Sales:[],
            selectedStock: this.emptyItem,
            isAddSaleFormOpen: false,
            item: this.emptySaleItem,
            date : new Date()
        }
        this.onSaleButtonClick = this.onSaleButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.onAddToSaleButtonClick = this.onAddToSaleButtonClick.bind(this)
    }
    
    async onSaleButtonClick(stock){ 
        const clickedStock = {
            id:stock.id,
            price: stock.price,
            purchasedDate : stock.purchasedDate,
            share: stock.share,
            ticker: stock.ticker,
            soldPrice: null, 
            soldDate: null,
            user: null,
            date : new Date()
        }
    //     axios.post(`/api/sales`, clickedStock)
    //     .then((response) => {
    //     const updatedData = this.state.Sales;
    //     updatedData.push(response.data);
    //     this.setState({
    //         Sales: updatedData
    //     })

    //     })

    //    .catch((error) =>{
    //         console.log(error.message)
    //       });
    //     this.remove(stock.id)

        this.setState({ isAddSaleFormOpen: true, selectedStock: stock, item : clickedStock })
            console.log(this.selectedStock)
            console.log(stock)
            console.log('successfully added');
    }

    onAddToSaleButtonClick(item){ 
        // this.setState({ isAddSaleFormOpen: true })
        // const {item} = this.state;
        console.log(item)
        axios.post(`/api/sales`, item)
        .then((response) => {
        const updatedData = this.state.Sales;
        updatedData.push(response.data);
        this.setState({
            Sales: updatedData
        })

        })

       .catch((error) =>{
            console.log(error.message)
          });
        this.remove(item.id)
        
        console.log('successfully added');
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

    handleDateChange(date){
        let item={...this.state.item};
        item.soldDate = date;
        this.setState({item});
      }

    // async getMoreInfoForSale(item){
    //     axios.post(`/api/sales`, item)
    //     .then((response)=>{
    //         let updatedStocks = [...this.state.Stocks].filter(i => i.id !== id);
    //         this.setState({Stocks : updatedStocks});
    //     })
    //     .catch((error) =>{
    //         console.log(error);
    //     })
    // }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name]= value;
        this.setState({item});
        console.log(this.state)
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
        const {Stocks, selectedStock, item, currentPrices,isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)
        
        let rows = 
        Stocks.map((stock, i) =>
            <tr key = {stock.id} >
            <td>{(stock.ticker).toUpperCase()}</td>
            <td>{stock.share}</td>
            <td>${stock.price}</td>
            <td>${currentPrices[i]}</td>
            <td>${(stock.share * parseFloat(stock.price)).toFixed(2)}</td>
            <td>${(stock.share * parseFloat(currentPrices[i])).toFixed(2)}</td>
            <td>${((currentPrices[i] - stock.price)*stock.share).toFixed(2)}</td>
            <td>%{((((currentPrices[i] - stock.price)*stock.share)/(stock.share * parseFloat(stock.price)))*100).toFixed(2)}</td>
            {/* <td>{((parseFloat(currentPrices[i]) - parseFloat(stock.price)/(stock.share * stock.price))).toFixed(2)}</td> */}
            <td><Moment date = {stock.purchasedDate} format = "YYYY/MM/DD"/></td>
            <Button size= 'sm' color='danger' onClick={()=> this.remove(stock.id)}>Delete</Button>
            <Button size= 'sm' color='success' onClick= {this.onSaleButtonClick.bind(this, stock)}>Sale</Button>
            </tr>
            )
          
        return (
            <section>
                <div>
                    <AppNav/>
                    <Container className = "center" style = {{margin: '2rem'}}>
                        <h3>Stock Collection</h3>
                        <Table className= 'table table-striped table-hover center'>
                            <thead className="w-auto p-3" style = {{background: "lightgray"}}>
                            <tr>
                                <th>Ticker</th>
                                <th>Share</th>
                                <th className="w-auto p-3">Purchased Price</th>
                                <th className="w-auto p-3">Current Price</th>
                                <th className="w-auto p-3">Total Cost</th>
                                <th className="w-auto p-3">Total Equity</th>
                                <th>Gain/Loss</th>
                                <th>%Gain/Loss</th>
                                <th className="w-auto p-3">Purchased Date</th>
                                <th className = "w-100 p-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Container>
                    <AddSale isAddSaleFormOpen = {this.state.isAddSaleFormOpen}>
                            <Container className = " card card-body px-lg-6">
                            <h5 className="card-header info-color white-text text-center py-4" style = {{background: "lightseagreen"}}>
                                <strong>Add Stock</strong>
                            </h5>
                            <Form onSubmit={this.onAddToSaleButtonClick.bind(this, item)}>
                            <FormGroup className= "md-form mt-3">
                                <lable for='ticker'>Ticker</lable>
                                <input type='text' value = {selectedStock.ticker} name='share' id='share' className = "form-control"/>
                            </FormGroup>

                            <FormGroup className="form-row">
                                <lable for='share'>Share</lable>
                                <input type='text' value = {selectedStock.share} name='share' id='share' className = "form-control"/>
                            </FormGroup>

                            <FormGroup className="form-row">
                                <lable for='price'>Purchased Price</lable>
                                <input type='text' value = {selectedStock.price} name='price' id='price' className = "form-control"/>
                            </FormGroup>

                            <FormGroup className="form-row">
                                <lable for='soldPrice'>Sold Price</lable>
                                <input type='text' name='soldPrice' id='soldPrice' className = "form-control" onChange={this.handleChange}/>
                            </FormGroup>

                            <div className='row'>
                            <FormGroup className='col-md-4 mb-3'>
                                <lable for='purcashedDate'>Purchased Date</lable>
                                <input type='text' value = {selectedStock.purchasedDate} name = 'purchasedDate' id='purchasedDate' id='purchasedDate' className = "form-control"/>
                            </FormGroup>

                            <FormGroup className='col-md-4 mb-3'>
                                <lable for='Solddate'>Sold Date</lable>
                                {/* <input type='text' name='soldDate' id='soldDate' className = "form-control" onChange={this.handleChange}/> */}
                                <DatePicker selected={this.state.item.soldDate} className = "form-control" onChange={this.handleDateChange} />
                            </FormGroup>
                            </div>
                                <Button color='primary' type='submit'>Save </Button>{' '}
                                <Button color='secondary'onClick ={(e)=> this.setState({isAddSaleFormOpen: false})}>Cancel</Button>
                            </Form>


                        </Container>
                    </AddSale>
                </div>
            </section>

        );
    }
}

 
export default Stock;