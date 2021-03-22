import React from 'react';
import { withRouter } from 'react-router-dom';

class Admin extends React.Component {
  render(){
    return (
      <div className="Admin ">
        <h1>This is ADMIN Page</h1>
        <p>Hello {this.props.location.state.data.user.name} !</p>
      </div>
    );
  }
}
  
export default withRouter (Admin) ;