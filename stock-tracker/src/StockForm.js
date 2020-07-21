import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import './App.css'
import AppNav from './AppNav';
import {Form, FormGroup, Button, Container } from 'reactstrap'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import AddSuccessAlert from './AddSuccessAlert';
import AddFailureAlert from './AddFailureAlert';
import AddToSaleListSuccessAlert from './AddToSaleListSuccessAlert';

class StockForm extends Component {
  emptyItem = {
    price: null,
    purchasedDate : new Date(),
    share: null,
    ticker: "",
    user: null
  }

  constructor(props){
    super(props)
    this.state = {
        isLoading : true,
        Stocks : [],
        date : new Date(),
        item : this.emptyItem,
        alert_message: "",
        capitals: [], 
        alertMessageForSale: "",

    }
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  async handleSumbit(event){
    
    const {item} = this.state;
    axios.post(`https://tithvorlak-stock-tracker.herokuapp.com/api/stocks`, item)
    .then((response) => {
      const updatedData = this.state.Stocks;
      updatedData.push(response.data);

    // subtract from cash from the capitals
      const addingItem = {
        value: item.share*item.price * (-1),
        description: "Purchased stocks",
        addedDate: item.purchasedDate,
        refId: updatedData[updatedData.length - 1].id
      }
      this.addSaleRecordToCapital(addingItem);
      this.setState({alertMessageForSale: "success", Stocks: updatedData, alert_message: "success"})
    
    })
    .catch((error) =>{
      this.setState({alert_message : "error"})
    });
    event.preventDefault();
    // console.log(this.state);
    // this.props.history.push('/stocks');
    // console.log(this.Stocks)
    event.target.reset();      
  }

  addSaleRecordToCapital(item){
    axios.post(`https://tithvorlak-stock-tracker.herokuapp.com/api/capitals`, item)
    .then((response) => {
      const updatedData = this.state.capitals;
      updatedData.push(response.data);
      this.setState({
      capitals: updatedData,
      alert_message: "success"
      })

    })
    .catch((error)=>{
        
      this.setState({
          alert_message: "error"
      })
    })
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

  handleDateChange(date){
    let item={...this.state.item};
    item.purchasedDate = date;
    this.setState({item});
  }
  async componentDidMount(){
    const response = await fetch('https://tithvorlak-stock-tracker.herokuapp.com/api/stocks');
    const body= await response.json();
    this.setState({Stocks : body, isLoading : false});

    // const responseStocks= await fetch('/api/stocks');
    // const bodyStocks = await responseStocks.json();
    // this.setState({Stock : bodyStocks , isLoading :false});
    // console.log(bodyStocks);
}

 
  render() { 
    const title = <h3 style={{ margin: '2rem 0'}}>Add Stock</h3>
    const {Stocks, isLoading} = this.state;

    if (isLoading)
      return(<div>Loading...</div>)

    // let optionList =
    //   Stocks.map(stock =>
    //     <option value = {stock.id} key = {stock.id}>
    //       {stock.ticker}
    //     </option>
    //   )
    
    return (
      <section>
        <div>
          <AppNav/>
          
          {this.state.alert_message === "success" ? <AddSuccessAlert/> : null}
          {this.state.alert_message === "error" ? <AddFailureAlert/> : null}
          {this.state.alertMessageForSale === "success" ? <AddToSaleListSuccessAlert/> : null}
          <Container>
            {title}

            <Form onSubmit={this.handleSumbit}>
              <FormGroup>
                <lable for='ticker'>Ticker</lable>
                {/* <select className = "form-control">
                  {optionList}
                </select> */}
                
                <input type='text' name='ticker' id='ticker' className = "form-control" onChange={this.handleChange}/>
              </FormGroup>

              <FormGroup>
                <lable for='share'>Share</lable>
                <input type='text' name='share' id='share' className = "form-control" onChange={this.handleChange}/>
              </FormGroup>

              <FormGroup>
                <lable for='price'>Purchased Price</lable>
                <input type='text' name='price' id='price' className = "form-control" onChange={this.handleChange}/>
              </FormGroup>

              <div className='row'>
              <FormGroup className='col-md-4 mb-3'>
                <lable for='purcashedDate'>Purchased Date</lable>
                <DatePicker selected={this.state.item.purchasedDate} className = "form-control" onChange={this.handleDateChange}/>              
              </FormGroup>
              </div>
                <Button color='primary' type='submit'>Save </Button>{' '}
                <Button color='danger' tag={Link} to = '/stocks'>Cancel</Button>
            </Form>

          </Container>

      
        </div>
      </section>
    );
  }
}
 
export default StockForm;
