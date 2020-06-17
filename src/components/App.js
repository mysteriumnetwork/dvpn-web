import React from "react";
import {Route, Redirect} from "react-router-dom";
import {firsRoute} from  './api/FirstRoute'
import '../styles/App.scss';
import Login from './Login/Login';
import Onboarding from './Onborading/Onboarding';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to= {"/" + firsRoute()} />
            )
          }}
        />
        <Route path="/login" component={Login}/>
        <Route path="/onboarding" component={Onboarding} />
      </div>
    );
  }
}

export default App;
