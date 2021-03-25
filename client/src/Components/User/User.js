import React from 'react';
import './User.css';
import { withRouter } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        postsCollection: null,
        errorHandler: null
    }
  }
  componentDidMount(){
    let data = {
    "name": localStorage.getItem("user")
    }
    fetch('http://localhost:5000/api/user', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    }).then(res => res.text())
    .then(res => {
      if(res.match(/Error/)){
        this.setState({errorHandler : res})
      } else if(res.match(/html/)){
        this.setState({postsCollection : "html"})
        document.querySelector(".postsWrapper").innerHTML = res
      } else {
        res = JSON.parse(res)
        this.setState({postsCollection : res})
      } 
    })
  }

  render(){
    if(!this.props.location.state){
      return(
      <div className="User">
          <h1>This is USER Page</h1>
          <p>But who YOU are???</p>
        </div>
      )
    } else if(!this.state.postsCollection){
      return(
        <div className="User">
          <h1>This is USER Page</h1>
          <p>Hello {this.props.location.state.data.user.name} !</p>
          <p>{this.state.errorHandler}</p>
        </div>
      )
    } else if(typeof this.state.postsCollection === "object"){
      return (
        <div className="User">
          <h1>This is USER Page</h1>
          <p>Hello {this.props.location.state.data.user.name} !</p>
          <h2>Your Posts</h2>
          <div className="postsWrapper">
          {this.state.postsCollection.map((item, i) => {
            return <div className={`postDiv postNumber${i+1}`} key={i}><p>{item.postHeader}</p><p>{item.postText}</p></div>
          })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="User">
          <h1>This is USER Page</h1>
          <p>Hello {this.props.location.state.data.user.name} !</p>
          <h2>Your Posts</h2>
          <div className="postsWrapper">
          </div>
        </div>
      );
    }
  }
}
  
export default withRouter (User);