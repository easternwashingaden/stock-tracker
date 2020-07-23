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
        item : {},
        alert_message: "",
        capitals: [], 
        alertMessageForSale: "",
        errors: {}


    }
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  handleSumbit(event){
    event.preventDefault();
    
    const {item} = this.state;
    if (this.validateForm()){
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
        let fields = {};
        fields["ticker"] = "";
        fields["share"] = "";
        fields["price"] = "";
        fields["share"] = "";
        this.addSaleRecordToCapital(addingItem);
        this.setState({ Stocks: updatedData, alert_message: "success", item : fields})
        // event.target.reset();
      })
      .catch((error) =>{
        this.setState({alert_message : "error"})
      });

      // this.setState({item: {}})
      
      // console.log(this.state);
      // this.props.history.push('/stocks');
      // console.log(this.Stocks)
      // event.target.reset();  
        // 
    }    
  }
  
  //Validate feilds 

  validateForm() {

    let item = this.state.item;
    let errors = {};
    let formIsValid = true;

    if (!item["ticker"]) {
      formIsValid = false;
      errors["ticker"] = "*Please enter the stock ticker.";
    }

    if (typeof item["ticker"] !== "undefined") {
      if (!item["ticker"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["ticker"] = "*Please enter alphabet characters only.";
      }
    }

    if (!item["share"]) {
      formIsValid = false;
      errors["share"] = "*Please enter the number of shares.";
    }

    if (typeof item["share"] !== "undefined") {
      if (!Number.isInteger(item["share"]) && item["share"] <= 0) {
        formIsValid = false;
        errors["share"] = "*Please enter a valid number of shares.";
      }
    }
    if (!item["price"]) {
      formIsValid = false;
      errors["price"] = "*Please enter the purchase price.";
    }

    if (typeof item["price"] !== "undefined") {
      if (item["price"] <= 0 ) {
        formIsValid = false;
        errors["password"] = "*Please enter a valid purchase price.";
      }
    }

    if (!item["purchasedDate"]) {
      formIsValid = false;
      errors["purchasedDate"] = "*Please pick a date.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;

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

  // handleChange(event){
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   let item={...this.state.item};
  //   item[name]= value;
  //   this.setState({item});
  //   console.log(this.state)
  // }

  handleChange(e) {
    let item = this.state.item;
    item[e.target.name] = e.target.value;
    this.setState({
      item
    });

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
      return(
        <span>
            <div>Loading...</div>
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </span>
      )

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
                <input type='text' name='ticker' id='ticker' value={this.state.item.ticker} className = "form-control" onChange={this.handleChange}/>
                <div className="errorMsg">{this.state.errors.ticker}</div>
              </FormGroup>

              <FormGroup>
                <lable for='share'>Share</lable>
                <input type='text' name='share' id='share' value={this.state.item.share} className = "form-control" onChange={this.handleChange}/>
                <div className="errorMsg">{this.state.errors.share}</div>
              </FormGroup>

              <FormGroup>
                <lable for='price'>Purchased Price</lable>
                <input type='text' name='price' id='price' value={this.state.item.price} className = "form-control" onChange={this.handleChange}/>
                <div className="errorMsg">{this.state.errors.price}</div>
              </FormGroup>

              <div className='row'>
              <FormGroup className='col-md-4 mb-3'>
                <lable for='purcashedDate'>Purchased Date</lable>
                <DatePicker selected={this.state.item.purchasedDate} className = "form-control" onChange={this.handleDateChange}/>
                <div className="errorMsg">{this.state.errors.purchasedDate}</div>              
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
