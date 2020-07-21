import React, { Component } from 'react';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'reactstrap';
import Moment from 'react-moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import AddSale from './AddSale';
import {Form, FormGroup, Button, Container } from 'reactstrap'
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import './App.css'
import DeleteSuccessAlert from './DeleteSuccessAlert';
import AddToSaleListSuccessAlert from './AddToSaleListSuccessAlert';
import UpdateSuccessAlert from './UpdateSuccessAlert';
import CurrencyFormat from 'react-currency-format';
class Capital extends Component {
    
    emptyItem = {
        value: null,
        addedDate : new Date(),
        description: ""
    }
    constructor(props){
        super(props);
        this.state ={
            isLoading : true,
            capitals : [], 
            selectedCapital: this.emptyItem,
            item: this.emptyItem,
            date : new Date(),
            isInEditMode: false,
            editingItem: this.emptyItem,
            date : new Date(),
            alertMessage: "",
            alertUpdateMessage: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.onClickEditButton = this.onClickEditButton.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)

    }

    onClickEditButton(stock){
        
        this.setState({ 
            isInEditMode : true,
            editingItem: stock
        })
        
        console.log(stock)
    }

    handleEdit(){
        const {editingItem} = this.state;
        axios.put(`/api/capital/${editingItem.id}`, editingItem)
        .then((response) =>{
            const updatedData = this.state.capitals;
                updatedData.push(response.data);
                this.setState({
                capitals: updatedData,
                isInEditMode : false,
                alertUpdateMessage: "success"
                
            })
        })
        .catch((error) =>{
            this.setState({
                alertUpdateMessage: "error"
            })
        })
        // this.setState({alertUpdateMessage: "success"})
    }

    async getCapitalArray(){
        const res = await axios.get('/api/capitals');
        this.setState({capitals: res.data});  
    }

    async componentDidMount(){
        await this.getCapitalArray();
        const response = await fetch('/api/capitals');
        const body= await response.json();
        this.setState({capitals : body, isLoading : false});

    }


    handleDateChange(date){
        let item={...this.state.item};
        item.addedDate = date;
        this.setState({item});
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name]= value;
        this.setState({item});
        console.log(this.state)
      }

    handleEditChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let editingItem={...this.state.editingItem};
        editingItem[name]= value;
        this.setState({editingItem});
        console.log(this.state)
    
      }
    async remove(id){
        axios.delete(`/api/capital/${id}`)
        .then((response)=>{
            let updatedCapitals = [...this.state.capitals].filter(i => i.id !== id);
            this.setState({
                capitals : updatedCapitals,
                alertMessage: 'success'
            });
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    renderEditView(){
        const {editingItem} = this.state;
        
        return(<Container>
            <h4>Edit Stock</h4>

            <Form onSubmit={this.handleEdit}>
              <FormGroup>
                <lable for='value'>Value</lable>
                
                <input type='text' value = {editingItem.value} name='value' id='value' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>

              <FormGroup>
                <lable for='description'>Value</lable>
                
                <input type='text' value = {editingItem.description} name='description' id='value' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>

              <div className='row'>
              <FormGroup className='col-md-4 mb-3'>
                <lable for='addedDate'>Added Date</lable>
                <input type='text' value = {editingItem.addedDate} name = 'addedDate' id='addedDate' className = "form-control" onChange={this.handleEditChange}/>
              </FormGroup>
              </div>
                <Button color='primary' type='submit'>Save </Button>{' '}
                <Button color='danger' onClick ={(e)=> this.setState({isInEditMode: false})}>Cancel</Button>
            </Form>

          </Container>
        )

    }
    render() { 
        const {capitals, selectedCapital, editItem, item,isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)
        let rows = 
        capitals.map((capital) =>
            <tr key = {capital.id} >
            <td className = { capital.value > 0 ? 'green': 'red'}>
                <CurrencyFormat value={parseFloat(capital.value).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td>{capital.description}</td>
            <td><Moment date = {capital.addedDate} format = "YYYY/MM/DD"/></td>
            <td>{capital.refId}</td>
            <Button size= 'sm' color='danger' onClick={()=> this.remove(capital.id)}>Delete</Button>
            <Button size= 'sm' color='primary' onClick={this.onClickEditButton.bind(this, capital)}>Edit</Button>
            {/* <Button size= 'sm' color='success' onClick= {this.onSaleButtonClick.bind(this, stock)}>Sale</Button> */}
            </tr>
            )
          
        return (
            this.state.isInEditMode ? 
            this.renderEditView() 
            :
            <section>
                <div>
                    <AppNav/>
                    <br></br>
                    {this.state.alertUpdateMessage === "success" ? <UpdateSuccessAlert/> : null}
                    {this.state.alertMessage === "success" ? <DeleteSuccessAlert/> : null}
                    {this.state.alertMessageForSale === "success" ? <AddToSaleListSuccessAlert/> : null}
                    <Container>
                        <h3 style = {{textAlign: 'center', fontWeight: 'bold'}}>Capital History</h3>
                        <br></br>
                        <Table className= 'table table-striped table-hover'>
                            <thead style = {{background: "lightseagreen"}}>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                                <th>Added Date</th>
                                <th>Confirmation Number</th>
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

 
export default Capital;