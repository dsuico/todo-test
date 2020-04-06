import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import NewSchedule from './NewSchedule'
import ScheduleList from './ScheduleList'
import SingleSchedule from './SingleSchedule'
import Login from "./Login"
import Register from "./Register"

class App extends Component {
  constructor(props) {
    let appState = localStorage["appState"]
        ? JSON.parse(localStorage["appState"])
        : "";  
    super(props)
    this.state = {
      isLoggedIn: false,
      token: null,
      user: {}
    }
    if(new Date().getTime() < appState.tokenExpiration || !appState.token) {
      this.state.isLoggedIn = appState.isLoggedIn;
      this.state.token = appState.token;
     
    }
  }
  componentDidMount() {
    if (localStorage.getItem('appState') !== null) {
      let state = JSON.parse(localStorage["appState"]);
      this.setState({
        isLoggedIn: state.isLoggedIn,
        token: state.token,

      });
      axios.get('/api/user',{headers: {Authorization: 'Bearer ' + state.token}})
      .then(response => {
        this.setState({
          user: response.data
        })
      })
    }
  }




  render() {
 

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch >
 
              <Route 
                exact
                path="/"
                render={props => 
                  this.state.isLoggedIn ? (
                  <ScheduleList
                    {...props}
                    logoutUser={this._logout}
                    user={this.state.user}
                  />
                ) : (
                   <Redirect to={{ pathname: '/login' }} />
                )}
              />
            <Route path='/schedule/create' render={props => 
              this.state.isLoggedIn ? (
                  <NewSchedule {...props}  /> 
                ) : (
                  <Redirect to={{ pathname: '/login' }} />
                )}
              />
            <Route path='/schedule/:id' render={props => 
              this.state.isLoggedIn ? (
                  <SingleSchedule {...props}  /> 
                ) : (
                  <Redirect to={{ pathname: '/login' }} />
                )}
              />
              <Route
                
                path="/login"
                render={props => 

                  this.state.isLoggedIn ? (
                   <Redirect to={{ pathname: '/' }} />
                ) : (
                  <Login {...props}/>
                  )}
              />
              <Route
                path="/register"
                render={props => (
                  <Register {...props} registerUser={this.registerUser} />
                )}
              />
              <Redirect to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))