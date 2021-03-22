import './App.css';
import React, { Component } from 'react';
import Main from "../Components/Main/Main.js"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import User from "../Components/User/User"
import Admin from "../Components/Admin/Admin"

class App extends Component {
  render(){
    return (
      <Router history={this.props.history}>
        <div className="App">
            <Switch>
              <Route path='/' exact component={() => <Main/>}/>
              <Route path='/user' exact component={() => <User/>}/>
              <Route path='/admin' exact component={() => <Admin/>}/>
            </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
