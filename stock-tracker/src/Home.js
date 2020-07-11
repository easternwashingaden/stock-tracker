import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <AppNav/>
                <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    Welcome to Stock Tracker Application
                </h1>
                <div id="my-carousel" class="carousel slide" data-interval="3000" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://i.imgur.com/BKHxTge.jpg" alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://i.imgur.com/fqfOIEE.jpg" alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://i.imgur.com/nHYJANK.png" alt="Third slide"/>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
 
export default Home;