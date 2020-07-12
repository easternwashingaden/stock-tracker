import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import Moment from 'react-moment';
import { Button, Container } from 'reactstrap';


 
import "react-datepicker/dist/react-datepicker.css";

// Each componant has two states - state and render function - stat is internal thing inside the component

class Stock extends Component {
    state = {
        isLoading : true,
        Stocks : []
    }
    //sync: when you make a request, you have to wait for the response...
    //async: good for user experience. you don't have to wait for the response...
    async componentDidMount(){
        const response = await fetch('/api/stocks');
        const body = await response.json();
        this.setState({Stocks :body, isLoading: false});
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

    
    render() { 
        const {Stocks, isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)
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
            <section>
                <div>
                    <AppNav/>
                    <Container style = {{margin: '2rem'}}>
                        <h3>Stock Collection</h3>
                        <Table className= 'mt-4 table-hover'>
                            <thead className="thead-light">
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

                </div>
            </section>

        );
    }
}
 
export default Stock;