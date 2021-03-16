import React, { Component } from "react";
import Swal from 'sweetalert2'
import "./login.css";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  inputHandler = (event) => {
    this.setState({
      username: event.target.value,
     
    });
  };
  inputHandlerPassword = (event) => {
    this.setState({
      password: event.target.value,
     
    });
  };

  myChangeHandler = (event) => {
    let sys_uname = "admin";
    let sys_password = "admin123";

    if (
      this.state.username === sys_uname &&
      this.state.password === sys_password
    ) {
      this.props.history.push("/weather");
    } else {
      Swal.fire('Oops...', 'Invalid Credentials! Please Check Again.', 'error');
    }
  };

  render() {
    return (
      <div>
        <div className="card">
          <h1 align="center">Login Required</h1>
          <form>
            <label>Username</label>
            <input
              type="text"
              name="uname"
              id="uname"
              onChange={this.inputHandler}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              onChange={this.inputHandlerPassword}
            />

            <input type="button" value="Login" onClick={this.myChangeHandler} />
          </form>
        </div>
      </div>
    );
  }
}

export default login;
