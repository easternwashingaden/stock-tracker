import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import LogInForm from './LogInForm'
import {FormGroup, Container } from 'reactstrap';

class Home extends Component {
    constructor(){
        super();
        this.state = {
          fields: {},
          errors: {},
          isLogin: true
    
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
        //     let fields = {};
        //     fields["username"] = "";
        //     fields["emailid"] = "";
        //     fields["mobileno"] = "";
        //     fields["password"] = "";
        //     this.setState({fields:fields});
        //     alert("Form submitted");
        this.setState({isLogin : false})
        
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
            errors["username"] = "*Wrong username please try again.";
          }
        }
    
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
    
        if (typeof fields["password"] !== "undefined") {
          // if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          if (fields["password"] !== "Loveada!"){
          formIsValid = false;
            errors["password"] = "*Wrong password please try again.";
          }
        }
      
    
        this.setState({
          errors: errors
        });
        return formIsValid;
    
      }
    renderLoginForm(){
        return (
            // <div className="user_card">
            //     <div className="brand_logo_container">
            //                 <img src="https://i.imgur.com/xgO7ERT.png" className="brand_logo" alt="Logo"/>
            //             </div>
            // <Form onSubmit= {this.submitForm}>
            //   <FormGroup>
            //     <label>Name</label>
            //     <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
            //     <div className="errorMsg">{this.state.errors.username}</div>
            //   </FormGroup>
      
            //   <FormGroup>
            //     <label>Password</label>
            //     <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
            //     <div className="errorMsg">{this.state.errors.password}</div>
            //   </FormGroup>
      
            //   <Button color='primary' type='submit'>LogIn </Button>{' '}
            // </Form>
            // </div>
        
        
        <div className = "push-down home"  >
            
            <div className="container h-100" >
                
            {/* <img src="https://i.imgur.com/PySlc3v.jpg" style = {{Width:'1000px'}} alt="Logo"/> */}
                <div class="d-flex justify-content-center h-100 pg">
                    <div className="user_card">
                    <div className="d-flex justify-content-center" >
                        <div className="brand_logo_container">
                            <img src="https://i.imgur.com/xgO7ERT.png" className="brand_logo" alt="Logo"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <Form onSubmit= {this.submitForm}>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    {/* <span className="input-group-text"><i className="fas fa-user"></i></span> */}
                                </div>
                                <FormGroup>
                                    {/* <label>Name</label> */}
                                    <input type="text" name="username" value={this.state.fields.username}  placeholder="Username" className="form-control input_user" onChange={this.handleChange} />
                                    <div className="errorMsg">{this.state.errors.username}</div>
                                </FormGroup>
                                {/* <input type="text" name="" className="form-control input_user" value="" placeholder="username"/> */}
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    {/* <span ><i class="fa fa-user" aria-hidden="true"></i></span> */}
                                </div>
                                <FormGroup>
                                    {/* <label>Password</label> */}
                                    <input type="password" name="password" value={this.state.fields.password}  placeholder="Password" className="form-control input_pass" onChange={this.handleChange} />
                                    <div className="errorMsg">{this.state.errors.password}</div>
                                </FormGroup>
                                {/* <input type="password" name="" className="form-control input_pass" value="" placeholder="password"/> */}
                            </div>
                            {/* <div className="form-group">
                                <div classNameName="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                    <label className="custom-control-label" for="customControlInline">Remember me</label>
                                </div>
                            </div> */}
                                <div className="d-flex justify-content-center mt-3 login_container">
                         {/* <button type="button" name="button" className="btn login_btn">Login</button> */}
                            <Button color='primary'  className="btn login_btn" type='submit'>Login </Button>{' '}
                       </div>
                       </Form>
                    </div>
                    
            
                </div>
                
            </div>
            
        </div>
    </div>
        )}
    render() { 
        
        return (
            this.state.isLogin ? 
            this.renderLoginForm()
            :
            <section>
                <div>
                    <AppNav/>

                    <h1 style={{textAlign: 'center', padding : "4rem", fontFamily: "cursive", fontWeight: "bold"}}>
                    {/* <h1 style={{textAlign: 'center', padding : "4rem", background: "lightgray", fontWeight: "bold"}}> */}
                        Welcome to Stock Tracker Application   
                    </h1>
                        <img
                            src="https://i.imgur.com/BKHxTge.jpg"
                            alt="First slide"
                            style = {{maxWidth:'100%'}}
                        /> 
                </div>
                       
                        {/* <div className = "reduce-content col">
                            <Carousel style={{alignContent: 'center'}}>
                                <Carousel.Item>
                                    <img
                                    className="image-fixed-size"
                                    src="https://i.imgur.com/BKHxTge.jpg"
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="image-fixed-size"
                                    src="https://i.imgur.com/vse4w7N.jpg"
                                    alt="Third slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="image-fixed-size"
                                    src="https://i.imgur.com/jAbUMQP.jpg"
                                    alt="Third slide"
                                    />

                                <Carousel.Caption>
                                </Carousel.Caption>
                                </Carousel.Item>
                                </Carousel>
                        </div>
                        
                      
                     */}
                      
            </section>
            
        );
    }
}
 
export default Home;