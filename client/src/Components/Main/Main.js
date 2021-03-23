import React from 'react'; 
import { withRouter } from 'react-router-dom';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }
    }
    authorizationHandler = (e) => {
        if (e.target.className === "login-name") {
            this.setState({ name: e.target.value })
        } else {
            this.setState({ password: e.target.value })
        }
    }
    login = () => {
        let data = {
        "name": this.state.name,
        "password": this.state.password
        }
        fetch('http://localhost:5000/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
        }).then(res => res.text())
        .then(res => {
        res = JSON.parse(res)
            if(res.user["user role"] === "admin"){
                this.props.history.push({
                pathname: '/admin',
                state: { data: res }
                })
            }
            else if(res.user["user role"] === "user"){
                localStorage.clear()
                localStorage.setItem("user", res.user.name)
                this.props.history.push({
                    pathname: '/user',
                    state: { data: res }
                })
            }
        })
    }
    render(){
        return (
            <div className="Main">
                <div className = "login" >
                    <h1> Login </h1> 
                    <input type = "text" placeholder = "Name" className = "login-name" onChange = { this.authorizationHandler }/> 
                    <input type = "password" placeholder = "Password" className = "login-password" onChange = { this.authorizationHandler }/> 
                    <button className = "submit-btn" onClick = { this.login }> Login </button> 
                </div>
            </div>
        );
    }
}
  

export default withRouter (Main)