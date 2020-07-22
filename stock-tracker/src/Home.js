import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LogInForm from './LogInForm'

class Home extends Component {
    state = {  }
    render() { 
        return (
            <section>
                <div>
                    <AppNav/>
                    
                    {/* <h1 style={{textAlign: 'center', padding : "4rem", background: "lightgray", fontWeight: "bold"}}>
                        Welcome to Stock Tracker Application   
                    </h1> */}
                    

                    <div style = {{margin: "5rem"}} className = "container">
                        <div className="row">
                        <div className="col card">

                            <h4 className="card-header info-color white-text text-center py-3" style = {{background: "lightseagreen", fontWeight: 'bold'}}>Log In</h4>
                           
                            {/* <Form style = {{alignContent: "center", marginLeft: "8rem", marginTop: "2rem"}}> */}
                                {/* <Form.Group className = "col-md-7" controlId="formBasicEmail"> */}
                                    {/* <Form.Label>Email address</Form.Label> */}
                                    {/* <Form.Control type="email" placeholder="Email" /> */}
                                    {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text> */}
                                {/* </Form.Group> */}

                                {/* <Form.Group className = "col-md-7" controlId="formBasicPassword"> */}
                                    {/* <Form.Label>Password</Form.Label> */}
                                    {/* <Form.Control type="password" placeholder="Password" /> */}
                                {/* </Form.Group> */}
                                
                                {/* <Button style = {{marginLeft: "1rem", marginBottom: "2rem"}} variant="primary" type="submit"> */}
                                    {/* Submit */}
                                {/* </Button> */}
                            {/* </Form> */}
                            <div style = {{alignContent: "center", marginLeft: "8rem", marginTop: "2rem"}}>
                                <LogInForm/>
                            </div>
                            
                        </div>
                        
                        <div className = "reduce-content col">
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
                        
                        </div>
                    </div>
                        
                    </div>
            </section>
            
        );
    }
}
 
export default Home;