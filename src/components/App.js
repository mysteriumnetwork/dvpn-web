import React from "react";
import {Route} from "react-router-dom";
import '../styles/App.scss';
import Login from './Login/login';

class App extends React.Component{
  render() {
    return (
      <div>
        <Route exact={true} path="/" component={Login} />
      </div>
    );
  }
}

export default App;
