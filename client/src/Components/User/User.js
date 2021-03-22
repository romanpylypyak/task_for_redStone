import React from 'react';
import { withRouter } from 'react-router-dom';

class User extends React.Component {
  render(){
    return (
      <div className="User">
        <h1>This is USER Page</h1>
        <p>Hello {this.props.location.state.data.user.name} !</p>
      </div>
    );
  }
}
  
export default withRouter (User);