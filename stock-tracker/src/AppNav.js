import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav,NavItem,NavLink,NavbarText} from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
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
                                <NavLink href="/about" >Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/portfolio">Portfolio</NavLink>
                            </NavItem>
                            <NavDropdown style = {{fontWeight: 'bold', fontSize: 'large'}} title="Stocks" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/stock">Add Stock</NavDropdown.Item>
                                <NavDropdown.Item href="/stocks">Stock Holdings</NavDropdown.Item>
                                <NavDropdown.Item href="/history">Sale History</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown style = {{fontWeight: 'bold', fontSize: 'large'}} title="Cash" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/capital">Add Cash</NavDropdown.Item>
                                <NavDropdown.Item href="/capitals">Capital History</NavDropdown.Item>
                            </NavDropdown>
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