import React, { Component } from 'react';
import AppNav from './AppNav';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import { Button, Container, Table } from 'reactstrap';

class Sale extends Component {
  constructor(props){
    super(props);
    this.state ={
        message: "",
        isLoading : true,
        Sales:[],
        selectedStock : null
    }
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
  async remove(id){
    axios.delete(`/api/sale/${id}`)
    .then((response)=>{
        let updatedSales = [...this.state.Sales].filter(i => i.id !== id);
        this.setState({Sales : updatedSales});
    })
    .catch((error) =>{
        console.log(error);
    })
  }
  
  render() { 
    const {Sales,isLoading} = this.state;
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
            </tr>
            )
          
        return (
            <section>
                <div>
                    <AppNav/>
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