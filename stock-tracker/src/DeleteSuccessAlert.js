import React, { Component } from 'react';

class DeleteSuccessAlert extends Component {
  state = {  }
  render() { 
    return (
      <div className = "alert alert-success" role = "alert">
        The record has been deleted successfully.
      </div>
    );
  }
}
 
export default DeleteSuccessAlert;