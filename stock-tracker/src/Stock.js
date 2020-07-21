import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import Moment from 'react-moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import AddSale from './AddSale';
import {Form, FormGroup, Button, Container } from 'reactstrap'
import DatePicker from "react-datepicker";
import './App.css'
import DeleteSuccessAlert from './DeleteSuccessAlert';
import AddToSaleListSuccessAlert from './AddToSaleListSuccessAlert';
import UpdateSuccessAlert from './UpdateSuccessAlert';
import CurrencyFormat from 'react-currency-format';
class Stock extends Component {
    emptySaleItem = {
        ticker: "",
        share: null,
        price: null,
        purchasedDate : new Date(),
        soldPrice: null, 
        soldDate: new Date(),
        user: [2,"Aden","Aden@john.com"]
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
            date : new Date(),
            isInEditMode: false,
            editingItem: this.emptyItem,
            date : new Date(),
            alertMessage: "",
            alertMessageForSale: "",
            alertUpdateMessage: "",
            refId: null,
            capitals: []
        }
        this.onSaleButtonClick = this.onSaleButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.onAddToSaleButtonClick = this.onAddToSaleButtonClick.bind(this)
        this.onClickEditButton = this.onClickEditButton.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)

    }
    
    onSaleButtonClick(stock){ 
        const clickedStock = {
            id:stock.id,
            price: stock.price,
            purchasedDate : stock.purchasedDate,
            share: stock.share,
            ticker: stock.ticker,
            soldPrice: null, 
            soldDate: null,
            user: null,
            
        }

        this.setState({ isAddSaleFormOpen: true, selectedStock: stock, item : clickedStock })
            console.log(this.selectedStock)
            console.log(stock)
            console.log('successfully added');
    }

    onClickEditButton(stock){
        
        this.setState({ 
            isInEditMode : true,
            editingItem: stock
        })
        
        console.log(stock)
    }

    handleEdit(){
        const {editingItem} = this.state;
        axios.put(`https://tithvorlak-stock-tracker.herokuapp.com/api/stock/${editingItem.id}`, editingItem)
        .then((response) =>{
            const updatedData = this.state.Stocks;
                updatedData.push(response.data);
                this.setState({
                Stock: updatedData,
                isInEditMode : false,
                alertUpdateMessage: "success"
                
            })
        })
        .catch((error) =>{
            this.setState({
                alertUpdateMessage: "error"
            })
        })
        // this.setState({alertUpdateMessage: "success"})
    }

    onAddToSaleButtonClick(item, event){ 
        event.preventDefault();
        console.log(item)
        axios.post(`https://tithvorlak-stock-tracker.herokuapp.com/api/sales`, item)
        .then((response) => {
            const updatedData = this.state.Sales;
            updatedData.push(response.data);
            
            const addingItem = {
                value: item.share*item.soldPrice,
                description: "Sold stocks",
                addedDate: item.soldDate,
                refId: updatedData[updatedData.length - 1].id
            }

            this.addSaleRecordToCapital(addingItem);
    
            this.setState({alertMessageForSale: "success", Sales: updatedData})
            
        })
       .catch((error) =>{
            console.log(error.message)
          });
        
        this.remove(item.id)
    
        this.setState({isAddSaleFormOpen: false})
        
  
    }

    addSaleRecordToCapital(item){
        console.log("Hiiii")
        axios.post(`https://tithvorlak-stock-tracker.herokuapp.com/api/capitals`, item)
        .then((response) => {
            console.log("Hiiii 22")
            const updatedData = this.state.capitals;
            updatedData.push(response.data);
            this.setState({
            capitals: updatedData,
            alert_message: "success"
            })

        })
        .catch((error)=>{
            console.log("Hiiii 3333")
            this.setState({
                alert_message: "error"
            })
        })
    }

    async getStockArray(){
        const res = await axios.get('https://tithvorlak-stock-tracker.herokuapp.com/api/stocks');
        this.setState({Stocks: res.data});
        await this.loadPrices(res.data)   
    }

    async getSaleArray(){
        const res = await axios.get('https://tithvorlak-stock-tracker.herokuapp.com/api/sales');
        this.setState({Sales: res.data});
        await this.loadPrices(res.data)   
    }

    async componentDidMount(){
        await this.getStockArray();
        const response = await fetch('https://tithvorlak-stock-tracker.herokuapp.com/api/stocks');
        const body= await response.json();
        this.setState({Stocks : body, isLoading : false});
        await this.getSaleArray();
        await this.getCapitalArray();

    }

    async loadPrices(tickers){
        const API_KEY = "pk_73f0d094a486473b8cf35ff01523599f";
        axios.all(tickers.map(stock => axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock.ticker}&outputsize=compact&apikey=${API_KEY}`)))
        
        // axios.all(tickers.map(stock => axios.get(`https://sandbox.iexapis.com/stable/stock/${stock.ticker}/quote?token=${API_KEY}`)))
            .then (axios.spread((...res) => {
                console.log(res);
                
                const latestPrices = res.map(element =>{
                    for (var key in element.data['Time Series (Daily)']) {
                        const allPrices = element.data['Time Series (Daily)'][key]['4. close']; 
                        console.log(allPrices)
                        return allPrices
                    }  
                })   
                // const latestPrices = res.map(element =>{
                //     return element.data['latestPrice']
                     
                // })

                // const latestPrice = res.data["latestPrice"]
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

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name]= value;
        this.setState({item});
        console.log(this.state)
      }

    handleEditChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let editingItem={...this.state.editingItem};
        editingItem[name]= value;
        this.setState({editingItem});
        console.log(this.state)
    
      }
    remove(id){
        axios.delete(`https://tithvorlak-stock-tracker.herokuapp.com/api/stock/${id}`)
        .then((response)=>{
            let updatedStocks = [...this.state.Stocks].filter(i => i.id !== id);
            this.setState({
                Stocks : updatedStocks,
                alertMessage: 'success'
            });
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    removePurchasedStock(stock){
        axios.delete(`https://tithvorlak-stock-tracker.herokuapp.com/api/stock/${stock.id}`)
        .then((response)=>{
            let updatedStocks = [...this.state.Stocks].filter(i => i.id !== stock.id);
            this.setState({
                Stocks : updatedStocks,
                alertMessage: 'success'
            });
        
        console.log(`stock: ${stock.id}`)
        const deletingCapital = this.state.capitals.find((element => element.refId === stock.id && element.description === "Purchased stocks"))
        console.log(deletingCapital);
        console.log(`deletingCapital: ${deletingCapital.id}`)
        // const deletingItemOnCapital = {
        //     value: stock.share*stock.soldPrice,
        //     description: "Sold stocks",
        //     addedDate: editingItem.soldDate,
        //     refId: editingItem.id
        this.removeCatpital(deletingCapital.id)
        //     }
        })
        .catch((error) =>{
            console.log(error);
        })

    }

    removeCatpital(id){
        axios.delete(`https://tithvorlak-stock-tracker.herokuapp.com/api/capital/${id}`)
        .then((response)=>{
            let updatedCapitals = [...this.state.capitals].filter(i => i.id !== id);
            this.setState({
                capitals : updatedCapitals,
                alertMessage: 'success'
            });
        })
        .catch((error) =>{
            console.log(error);
        })

    }

    async getCapitalArray(){
        const res = await axios.get('https://tithvorlak-stock-tracker.herokuapp.com/api/capitals');
        this.setState({capitals: res.data});  
      }

    renderEditView(){
        const {editingItem} = this.state;
        
        return(<Container>
            <h4>Edit Stock</h4>

            <Form onSubmit={this.handleEdit}>
              <FormGroup>
                <lable for='ticker'>Ticker</lable>
                
                <input type='text' value = {editingItem.ticker} name='ticker' id='ticker' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>

              <FormGroup>
                <lable for='share'>Share</lable>
                <input type='text' value = {editingItem.share} name='share' id='share' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>

              <FormGroup>
                <lable for='price'>Purchased Price</lable>
                <input type='text' value = {editingItem.price} name='price' id='price' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>

              <div className='row'>
              <FormGroup className='col-md-4 mb-3'>
                <lable for='purchasedDate'>Purchased Date</lable>
                {/* <DatePicker selected={this.state.emptyItem.purchasedDate} className = "form-control" onChange={this.handleDateChange} /> */}
                {/* <DatePicker selected={editingItem.purchasedDate} className = "form-control" onChange={this.handleDateChange} /> */}
                <input type='text' value = {editingItem.purchasedDate} name = 'purchasedDate' id='purchasedDate' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>
              </div>
                <Button color='primary' type='submit'>Save </Button>{' '}
                <Button color='secondary' onClick ={(e)=> this.setState({isInEditMode: false})}>Cancel</Button>
            </Form>

          </Container>
        )

    }
    render() { 
        const {Stocks, selectedStock, editItem, item, currentPrices,isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)
        
        let rows = 
        Stocks.map((stock, i) =>
            <tr key = {stock.id} >
            <td>{(stock.ticker).toUpperCase()}</td>
            <td>{stock.share}</td>
            <td>
                <CurrencyFormat value={parseFloat(stock.price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td>
                <CurrencyFormat value={parseFloat(currentPrices[i]).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td>
                <CurrencyFormat value={(stock.share * parseFloat(stock.price)).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td>
                <CurrencyFormat value={(stock.share * parseFloat(currentPrices[i])).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td className = {(currentPrices[i] - stock.price) > 0 ? 'green': 'red'}>
            <CurrencyFormat value={((currentPrices[i] - stock.price)*stock.share).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td className = {(currentPrices[i] - stock.price) > 0 ? 'green': 'red'}>{((((currentPrices[i] - stock.price)*stock.share)/(stock.share * parseFloat(stock.price)))*100).toFixed(2)}%</td>
            {/* <td>{((parseFloat(currentPrices[i]) - parseFloat(stock.price)/(stock.share * stock.price))).toFixed(2)}</td> */}
            <td><Moment date = {stock.purchasedDate} format = "YYYY/MM/DD"/></td>
            <Button size= 'sm' color='danger' onClick={this.removePurchasedStock.bind(this, stock)}>Delete</Button>
            <Button size= 'sm' color='primary' onClick={this.onClickEditButton.bind(this, stock)}>Edit</Button>
            <Button size= 'sm' color='success' onClick= {this.onSaleButtonClick.bind(this, stock)}>Sale</Button>
            </tr>
            )
          
        return (
            this.state.isInEditMode ? 
            this.renderEditView() 
            :
            <section>
                <div>
                    <AppNav/>
                    {/* <br></br> */}
                    {this.state.alertUpdateMessage === "success" ? <UpdateSuccessAlert/> : null}
                    {this.state.alertMessage === "success" ? <DeleteSuccessAlert/> : null}
                    {this.state.alertMessageForSale === "success" ? <AddToSaleListSuccessAlert/> : null}
                    <Container>

                        <h3 style = {{textAlign: 'center', fontWeight: 'bold', margin: '2rem'}}>Stock Holdings</h3>
                        <br></br>
                        <Table style = {{width: '120%'}}className= 'table table-striped table-hover center w-auto'>
                            <thead style = {{background: "lightseagreen"}}>
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
                                <input type='text' value = {selectedStock.purchasedDate} name = 'purchasedDate' id='purchasedDate' className = "form-control"/>
                            </FormGroup>

                            <FormGroup className='col-md-4 mb-3'>
                                <lable for='Solddate'>Sold Date</lable>
                                {/* <input type='text' name='soldDate' id='soldDate' className = "form-control" onChange={this.handleChange}/> */}
                                <DatePicker selected={this.state.item.soldDate} className = "form-control" onChange={this.handleDateChange} />
                            </FormGroup>
                            </div>
                                <Button color='primary' type='submit'> Save </Button>{' '}
                                <Button color='danger'onClick ={(e)=> this.setState({isAddSaleFormOpen: false})}>Cancel</Button>
                            </Form>
                        </Container>
                    </AddSale>
                </div>
            </section>

        );
    }
}

 
export default Stock;