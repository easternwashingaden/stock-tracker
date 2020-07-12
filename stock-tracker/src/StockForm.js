import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import './App.css'
import AppNav from './AppNav';
import Stock from './Stock';
import {Form, FormGroup, Button, Container, lable, input } from 'reactstrap'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import Moment from 'react-moment';
class StockForm extends Component {
  emptyItem = {
    id: '103',
    purchasedDate : new Date(),
    share: 100,
    purchasedPrice: 350,
    users: [2,"Aden","Aden@john.com"]
  }

  constructor(props){
    super(props)
    this.state = {
        isLoading : true,
        Stocks : [],
        purchasedDate : new Date(),
        item : this.emptyItem
    }
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  async handleSumbit(event){
    event.preventDefault();
    const {item} = this.state;
    await fetch(`/api/stocks`, {
      method : 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body :JSON.stringify(item),
    });
    console.log(this.state);
    this.props.history.push('/stocks')
    console.log('successfully added')
    
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
    console.log(item)
  }

  async remove(id){
    await fetch(`/api/stocks/${id}`,{
      method: 'DELETE',
      headers: {
        'Accept': 'applicaion/json',
        'Content-Type' : 'application/json'
      }
    }).then(()=>{
      let updatedStocks = [...this.state.Stocks].filter(i => i.id !== id);
      this.setState({Stocks : updatedStocks});
    });
  }
  async componentDidMount(){
    const response = await fetch('/api/stocks');
    const body= await response.json();
    this.setState({Stocks : body, isLoading : false});
  }

 
  render() { 
    const title = <h3 style={{ margin: '2rem 0'}}>Add Stock</h3>
    const {Stocks, isLoading} = this.state;

    if (isLoading)
      return(<div>Loading...</div>)

    let optionList =
      Stocks.map(stock =>
        <option value = {stock.id} key = {stock.id}>
          {stock.ticker}
        </option>
      )
    
    let rows = 
      Stocks.map(stock =>
        <tr key = {stock.id} >
          <td>{stock.id}</td>
          <td>{stock.ticker}</td>
          <td>{stock.share}</td>
          <td>{stock.price}</td>
          <td><Moment date = {stock.purchasedDate} format = "YYYY/MM/DD"/></td>
          <td><Button size= 'sm' color='danger' onClick={()=> this.remove(stock.id)}>Delete</Button></td>
        </tr>
        )
    
    return (
     
        <div>
          <AppNav/>
          <Container>
            {title}

            <Form onSubmit={this.handleSumbit}>
              <FormGroup>
                <lable for='ticker'>Ticker</lable>
                <select className = "form-control">
                  {optionList}
                </select>
                
                {/* <input type='text' name='ticker' id='ticker' className = "form-control" onChange={this.handleChange} autoComplete='name'/> */}
              </FormGroup>

              <FormGroup>
                <lable for='share'>Share</lable>
                <input type='text' name='share' id='share' className = "form-control" onChange={this.handleChange}/>
              </FormGroup>

              <FormGroup>
                <lable for='purchasedPrice'>Purchased Price</lable>
                <input type='text' name='purchasedPrice' id='purchasedPrice' className = "form-control" onChange={this.handleChange}/>
              </FormGroup>

              <div className='row'>
              <FormGroup className='col-md-4 mb-3'>
                <lable for='purcashedDate'>Purchased Date</lable>
                <DatePicker selected={this.state.item.purchasedDate} className = "form-control" onChange={this.handleChange}/>
              </FormGroup>
              </div>
                <Button color='primary' type='submit'>Save </Button>{' '}
                <Button color='secondary' tag={Link} to = '/stocks'>Cancel</Button>
            </Form>

          </Container>
      {' '}
      <br></br>

      {/* <Stock/> */}
          <Container>
            <h3>Stock Collection</h3>
            <Table className= 'mt-4'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Ticker</th>
                <th>Share</th>
                <th>Purchased Price</th>
                <th>Purchased Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>

            </Table>
          </Container>
        }

        </div>
    );
  }
}
 
export default StockForm;
