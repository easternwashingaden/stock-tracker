import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import './App.css'
import AppNav from './AppNav';
import {Form, FormGroup, Button, Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import AddSuccessAlert from './AddSuccessAlert';
import AddFailureAlert from './AddFailureAlert';

class AddCapital extends Component {
  emptyItem = {
    value: null,
    addedDate : new Date(),
    description: ""
  }

  constructor(props){
    super(props)
    this.state = {
        isLoading : true,
        capitals : [],
        date : new Date(),
        item : {},
        alert_message: "",
        errors: {}
    }
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  validateForm() {

    let item = this.state.item;
    let errors = {};
    let formIsValid = true;

    if (!item["value"]) {
      formIsValid = false;
      errors["value"] = "*Please enter the value.";
    }

    if (typeof item["value"] !== "undefined") {
      if (item["value"] <= 0) {
        formIsValid = false;
        errors["value"] = "*Please enter a valid value";
      }
    }

    if (!item["addedDate"]) {
      formIsValid = false;
      errors["addedDate"] = "*Please pick a date.";
    }

    
    if (!item["description"]) {
      formIsValid = false;
      errors["description"] = "*Please enter the description.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;

  }
  
  handleSumbit(event){
    event.preventDefault();
    if (this.validateForm()){
      const {item} = this.state;
      axios.post(`https://tithvorlak-stock-tracker.herokuapp.com/api/capitals`, item)
      .then((response) => {
        const updatedData = this.state.capitals;
        updatedData.push(response.data);
        this.setState({
          capitals: updatedData,
          alert_message: "success"
        })
        
      })

      .catch((error) =>{
        this.setState({alert_message : "error"})
      });

      event.target.reset();
    }     
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
    item.addedDate = date;
    this.setState({item});
  }
  async componentDidMount(){
    const response = await fetch('https://tithvorlak-stock-tracker.herokuapp.com/api/capitals');
    const body= await response.json();
    this.setState({capitals : body, isLoading : false});

    const responseCapitals= await fetch('https://tithvorlak-stock-tracker.herokuapp.com/api/capitals');
    const bodyCapitals = await responseCapitals.json();
    this.setState({capitals : bodyCapitals , isLoading :false});
    console.log(bodyCapitals);
}

 
  render() { 
    const title = <h3 style={{ margin: '2rem 0'}}>Add Cash</h3>
    const {capitals, isLoading} = this.state;

    if (isLoading)
      return(<div>Loading...</div>)

    
    return (
      <section>
        <div>
          <AppNav/>
    
          {this.state.alert_message === "success" ? <AddSuccessAlert/> : null}
          {this.state.alert_message === "error" ? <AddFailureAlert/> : null}
          <Container>
            {title}

            <Form onSubmit={this.handleSumbit}>
              <FormGroup>
                <lable for='value'>Value</lable>
                <input type='text' name='value' id='value' value={this.state.item.value}  className = "form-control" onChange={this.handleChange}/>
                <div className="errorMsg">{this.state.errors.value}</div>
              </FormGroup>

              <FormGroup>
                <lable for='description'>Description</lable>
                <input type='text' name='description' id='description' value={this.state.item.description} className = "form-control" onChange={this.handleChange}/>
                <div className="errorMsg">{this.state.errors.description}</div>
              </FormGroup>

              <FormGroup className='col-md-4 mb-3'>
                <lable for='addedDate'>Added Date</lable>
                <DatePicker selected={this.state.item.addedDate} className = "form-control" onChange={this.handleDateChange}/> 
                <div className="errorMsg">{this.state.errors.addedDate}</div>             
              </FormGroup>

              <div className='row'>
              
              </div>
                <Button color='primary' type='submit'>Save </Button>{' '}
                <Button color='danger'>Cancel</Button>
                {/* <Button color='secondary' tag={Link} to = '/capitals'>Cancel</Button> */}
            </Form>

          </Container>

      
        </div>
      </section>
    );
  }
}
 
export default AddCapital;
