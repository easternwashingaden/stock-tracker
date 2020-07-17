import React, { Component } from 'react';

class AddFailureAlert extends Component {
  state = {  }
  render() { 
    return (
      <div className = "alert alert-danger" role = "alert">
        Error Occurred. Cannot add the stock record.
      </div>
    );
  }
}
 
export default AddFailureAlert;