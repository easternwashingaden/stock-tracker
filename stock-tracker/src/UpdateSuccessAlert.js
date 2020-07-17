import React, { Component } from 'react';

class UpdateSuccessAlert extends Component {
  state = {  }
  render() { 
    return (
      <div className = "alert alert-success" role = "alert">
        New record has been updated successfully.
      </div>
    );
  }
}
 
export default UpdateSuccessAlert;