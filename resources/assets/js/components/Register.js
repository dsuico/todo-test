import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email:'',
      password: '',
      password_confirmation: ''
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleRegister(e) {
     e.preventDefault();
    $("#email-login-btn")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );

    var formData = new FormData(); 
    formData.append("password", this.state.password);
    formData.append("password_confirmation", this.state.password_confirmation);
    formData.append("email", this.state.email);
    formData.append("name", this.state.name);

    axios
      .post("/api/register", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        let appState = {
          isLoggedIn: true,
          token: json.data.access_token,
          tokenExpiration: new Date().getTime() + json.data.expires_in
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
          token: appState.token
        });
        window.location.replace('/')
      })
      .catch(error => {
        alert("An Error Occured!" + error);
        console.log(`${formData} ${error}`);
        $("#email-login-btn")
          .removeAttr("disabled")
          .html("Register");
      });
  }
  render() {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
        <form action="" onSubmit={this.handleRegister} method="post">
          <h3 style={{ padding: 15 }}>Register Form</h3>
          <input
            value={this.state.name}
            onChange={this.handleFieldChange}
            style={styles.input}
            autoComplete="off"
            id="name"
            name="name"
            type="text"
            className="center-block"
            placeholder="Name"
          />
          <input
            value={this.state.email}
            onChange={this.handleFieldChange}
            style={styles.input}
            autoComplete="off"
            id="email"
            name="email"
            type="text"
            className="center-block"
            placeholder="email"
          />
          <input
            value={this.state.password}
            onChange={this.handleFieldChange}
            style={styles.input}
            autoComplete="off"
            id="password"
            name="password"
            type="password"
            className="center-block"
            placeholder="password"
          />
          <input
            value={this.state.password_confirmation}
            onChange={this.handleFieldChange}
            style={styles.input}
            autoComplete="off"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            className="center-block"
            placeholder="confirm password"
          />
          <button
            type="submit"
            style={styles.button}
            className="landing-page-btn center-block text-center"
            id="email-login-btn"
            href="#facebook"
          >
            Register
          </button>

          <Link style={styles.link} to="/login">
            Login
          </Link>
        </form>
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
    width: "83%",
    float: "left",
    clear: "both",
    textAlign: "center"
  }
};

export default Register;
