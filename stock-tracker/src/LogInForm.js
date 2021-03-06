import React, { Component } from 'react';
import {Form, FormGroup, Button, Container } from 'reactstrap';
import './App.css';

class LogInForm extends Component {
  constructor(){
    super();
    this.state = {
      fields: {},
      errors: {}

    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submitForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
        let fields = {};
        fields["username"] = "";
        fields["emailid"] = "";
        fields["mobileno"] = "";
        fields["password"] = "";
        this.setState({fields:fields});
        alert("Form submitted");
    }

  }


  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
      if (fields["username"] !== "Somany Mok") {
        formIsValid = false;
        errors["username"] = "*Wrong user name please try again.";
      }
    }

    // if (!fields["emailid"]) {
    //   formIsValid = false;
    //   errors["emailid"] = "*Please enter your email-ID.";
    // }

    // if (typeof fields["emailid"] !== "undefined") {
    //   //regular expression for email validation
    //   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //   if (!pattern.test(fields["emailid"])) {
    //     formIsValid = false;
    //     errors["emailid"] = "*Please enter valid email-ID.";
    //   }
    // }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      // if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      if (fields["password"] !== "Loveada!"){
      formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }
  

    this.setState({
      errors: errors
    });
    return formIsValid;

  }


  render() { 
    return (
      <Form onSubmit= {this.submitForm}>
        <FormGroup>
          <label>Name</label>
          <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
          <div className="errorMsg">{this.state.errors.username}</div>
        </FormGroup>

        {/* <FormGroup>
          <label>Email</label>
          <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
          <div className="errorMsg">{this.state.errors.emailid}</div>
        </FormGroup> */}

        <FormGroup>
          <label>Password</label>
          <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
          <div className="errorMsg">{this.state.errors.password}</div>
        </FormGroup>

        <Button color='primary' type='submit'>Log In </Button>{' '}
      </Form>
    );
  }
}
 
export default LogInForm;