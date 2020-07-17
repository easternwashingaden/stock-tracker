import React, { Component } from 'react';
import AppNav from './AppNav';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import { Button, Container, Table, Form, FormGroup  } from 'reactstrap';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import DeleteSuccessAlert from './DeleteSuccessAlert';

class Sale extends Component {
  emptySaleItem = {
    ticker: "",
    share: null,
    price: null,
    purchasedDate : new Date(),
    soldPrice: null, 
    soldDate: new Date(),
    user: [2,"Aden","Aden@john.com"]
  }
  constructor(props){
    super(props);
    this.state ={
        message: "",
        isLoading : true,
        Sales:[],
        selectedStock : null,
        isInEditMode: false,
        editingItem: this.emptySaleItem,
        date: new Date(),
        alertMessage: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
    this.onClickEditButton= this.onClickEditButton.bind(this)
  }

  async getSaleArray(){
    const res = await axios.get('/api/sales');
    this.setState({Sales: res.data});  
  }

  async componentDidMount(){
    await this.getSaleArray();
    const response = await fetch('/api/sales');
    const body= await response.json();
    this.setState({Sales : body, isLoading : false});

  }

  onClickEditButton(stock){
    this.setState({
      isInEditMode : true,
      editingItem : stock
      
    })

    console.log(stock)
  }
  async remove(id){
    axios.delete(`/api/sale/${id}`)
    .then((response)=>{
        let updatedSales = [...this.state.Sales].filter(i => i.id !== id);
        this.setState({
          Sales : updatedSales,
          alertMessage : "success"
        });
    })
    .catch((error) =>{
        console.log(error);
    })
  }

  updateItem(){
    const {editingItem} = this.state;
    axios.put(`/api/sale/${editingItem.id}`, editingItem)
    .then((response) =>{
      const updatedData = this.state.Sales;
          updatedData.push(response.data);
          this.setState({
            Sales: updatedData,
            isInEditMode : false
          })

          console.log(this.Sales)
          console.log("Updated successfully")
    })
    .catch((error) =>{
      console.log(error.message)
    })
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let editingItem={...this.state.editingItem};
    editingItem[name]= value;
    this.setState({editingItem});
    console.log(this.state)

  }

  handleDateChange(date){
    let editingItem={...this.state.editingItem};
    editingItem.soldDate = date;
    this.setState({editingItem});
  }

  renderEditView(){
    const {editingItem} = this.state;
    return(
      
      <Container className = " card card-body px-lg-6">
        <h5 className="card-header info-color white-text text-center py-4" style = {{background: "lightseagreen"}}>
          <strong>Edit Record</strong>
        </h5>
        <Form onSubmit={this.updateItem.bind(this, editingItem)}>
        <FormGroup className= "md-form mt-3">
          <lable for='ticker'>Ticker</lable>
          <input type='text' value = {editingItem.ticker} name='ticker' id='ticker' className = "form-control"/>
        </FormGroup>

        <FormGroup className="form-row">
          <lable for='share'>Share</lable>
          <input type='text' value = {editingItem.share} name='share' id='share' className = "form-control"/>
        </FormGroup>

        <FormGroup className="form-row">
          <lable for='price'>Purchased Price</lable>
          <input type='text' value = {editingItem.price} name='price' id='price' className = "form-control" onChange={this.handleChange}/>
        </FormGroup>

        <FormGroup className="form-row">
          <lable for='soldPrice'>Sold Price</lable>
          <input type='text' value = {editingItem.soldPrice} name='soldPrice' id='soldPrice' className = "form-control" onChange={this.handleChange}/>
        </FormGroup>

        <div className='row'>
        <FormGroup className='col-md-4 mb-3'>
          <lable for='purchasedDate'>Purchased Date</lable>
          <input type='text' value = {editingItem.purchasedDate} name = 'purchasedDate' id='purchasedDate' className = "form-control" onChange={this.handleChange}/>
        </FormGroup>

        <FormGroup className='col-md-4 mb-3'>
          <lable for='soldDate'>Sold Date</lable>
          {/* <input type='text' name='soldDate' id='soldDate' className = "form-control" onChange={this.handleChange}/> */}
          {/* <DatePicker type='text' name='soldDate' id='soldDate' selected = {editingItem.soldDate} className = "form-control" onChange={this.handleDateChange} /> */}
          <input type='text' value = {editingItem.soldDate} name = 'soldDate' id='soldDate' className = "form-control" onChange={this.handleChange}/>
        </FormGroup>
        </div>
          <Button color='primary' type='submit'> Save </Button>
          <Button color='secondary'onClick ={(e)=> this.setState({isAddSaleFormOpen: false})}>Cancel</Button>
      </Form>
    </Container>
    )
  }
  
  render() { 

    const {Sales, isLoading} = this.state;
        if(isLoading)
          return(<div>Loading...</div>)
        
        let rows = 
        Sales.map((stock, i) =>
            <tr key = {stock.id} >
            <td>{(stock.ticker)}</td>
            <td>{stock.share}</td>
            <td>${stock.price}</td>
            <td>${stock.soldPrice}</td>
            <td><Moment date = {stock.purchasedDate} format = "YYYY/MM/DD"/></td>
            <td><Moment date = {stock.soldDate} format = "YYYY/MM/DD"/></td>
            <td>${(stock.soldPrice - stock.price).toFixed(2)}</td>
            <td>%{(((stock.soldPrice - stock.price)/stock.price)*100).toFixed(2) }</td>
            <Button size= 'sm' color='danger' onClick={()=> this.remove(stock.id)}>Delete</Button>
            <Button size= 'sm' color='primary' onClick={this.onClickEditButton.bind(this, stock)}>Edit</Button>
            </tr>
            )
          
        return (
          this.state.isInEditMode ? 
          this.renderEditView() 
          :  
          <section>
              <div>
                  <AppNav/>
                  <br></br>
                  {this.state.alertMessage === "success" ? <DeleteSuccessAlert/> : null}
                  <Container className = "center" style = {{margin: '2rem'}}>
                      <h3>Stock Collection</h3>
                      <Table className= 'table table-striped table-hover center'>
                          <thead className="w-auto p-3" style = {{background: "lightgray"}}>
                          <tr>
                              <th>Ticker</th>
                              <th>Share</th>
                              <th className="w-auto p-3">Purchased Price</th>
                              <th className="w-auto p-3">Sold Price</th>
                              <th>Purchased Date</th>
                              <th>Sold Date</th>
                              <th className="w-auto p-3">Gain/Loss</th>
                              <th className="w-auto p-3">%Gain/Loss</th>
                              <th className = "w-100 p-3">Action</th>
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
 
export default Sale ;