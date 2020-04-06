import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email:'',
      password: '',
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleLogin(e) {
    e.preventDefault();
    $("#login-form button")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );
    var formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    const { history } = this.props
    console.log(history)
    axios
      .post("api/login", formData)

      .then(json => {


        console.log(json)

          let appState = {
            isLoggedIn: true,
            token: json.data.access_token,
            tokenExpiration: new Date().getTime() + json.data.expires_in
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState(appState);
          
          window.location.replace('/')


        
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      });
  }
  render() {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
        <form action="" onSubmit={this.handleLogin} method="post">
          <h3 style={{ padding: 15 }}>Login Form</h3>
          <input
   
            style={styles.input}
            autoComplete="off"
            id="email"
            name="email"
            type="text"
            value={this.state.email}
                        onChange={this.handleFieldChange}
            className="center-block"
            placeholder="email"
          />
          <input
           
            style={styles.input}
            autoComplete="off"
            id="password"
            value={this.state.password}
            onChange={this.handleFieldChange}
            name="password"
            type="password"
            className="center-block"
            placeholder="password"
          />
          <button
            type="submit"
            style={styles.button}

            className="landing-page-btn center-block text-center"
            id="email-login-btn"
            href="#facebook"
          >
            Login
          </button>
        </form>
        <Link style={styles.link} to="/register">
          Register
        </Link>
      </div>
      </div>
    );
  }
}

const styles = {
  input: {
    backgroundColor: "white",
    border: "1px solid #cccccc",
    padding: 15,
    float: "left",
    clear: "right",
    width: "80%",
    margin: 15
  },
  button: {
    height: 44,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    border: "none",
    backgroundColor: "red",
    margin: 15,
    float: "left",
    clear: "both",
    width: "80%",
    color: "white",
    padding: 15
  },
  link: {
    width: "75%",
    float: "left",
    clear: "both",
    textAlign: "center"
  }
};

export default Login;
