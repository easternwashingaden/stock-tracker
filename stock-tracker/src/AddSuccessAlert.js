import React, { Component } from 'react';

class AddSuccessAlert extends Component {
  state = {  }
  render() { 
    return (
      <div className = "alert alert-success" role = "alert">
        New record has been added successfully.
      </div>
    );
  }
}
 
export default AddSuccessAlert;