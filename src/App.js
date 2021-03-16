import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./weather";
import Login from "./login";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
      
          <Route exact path="/" component={Login} />
          <Route exact path="/weather" component={Home} />
        
        </Switch>
      </Router>
    );
  }
}

export default App;
