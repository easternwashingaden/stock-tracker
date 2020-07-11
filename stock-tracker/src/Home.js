import React, { Component } from 'react';
import AppNav from './AppNav';
class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <AppNav/>
                <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    Welcome to Stock Tracker Application
                </h1>
            </div>
            
        );
    }
}
 
export default Home;