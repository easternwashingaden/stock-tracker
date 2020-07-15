import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'reactstrap';

class AddSale extends Component {
  state = {  }
  render() { 
    let addSale = (
      <div>{this.props.children}</div>
    )
      if (!this.props.isAddSaleFormOpen){
        addSale = null;
      }
      return(
        <div>
          {addSale}
        </div>

    );
  }
}
 
export default AddSale;