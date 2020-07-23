import React, { Component } from 'react';

class AddToSaleListSuccessAlert extends Component {
  state = {  }
  render() { 
    return (
      <div className = "alert alert-success" role = "alert">
        New record has been added to the sold list successfully.
      </div>
    );
  }
}
 
export default AddToSaleListSuccessAlert;