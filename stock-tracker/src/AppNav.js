import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav,Navbar,NavbarBrand,NavItem,NavLink,NavbarText} from 'reactstrap';
class AppNav extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar light expand="md" id ="background-color">
                    <a href="#"><img src = "https://i.imgur.com/3CsrAvY.jpg" className= "App-logo" alt = "logo"/></a>
                    {/* <NavbarBrand href="/">Stock Tracker Application</NavbarBrand> */}
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/" >Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/stocks">Stocks</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/stock">Add Stock</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/stockperformance">Stock Performance</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
    </div>
         );
    }
}
 
export default AppNav;