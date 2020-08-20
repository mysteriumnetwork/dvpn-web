import React from "react";
import "../../assets/styles/pages/authenticated/main.scss"
import {Route, Redirect, Switch} from "react-router-dom";
import {useHistory} from 'react-router'
import {RootState} from "../../redux/store";
import {onboard} from "../../redux/actions/onboarding/onboard";
import {connect} from "react-redux";
import {
  HOME,
  NOT_FOUND,
  DASHBOARD,
  SESSIONS,
  SETTINGS,
  WALLET
} from '../../constants/routes'
import Dashboard from "./Pages/Dashboard";
import Sessions from "./Pages/Sessions";
import Settings from "./Pages/Settings";
import Wallet from "./Pages/Wallet";
import Navigation from "./Components/navigation";


const mapStateToProps = (state: RootState) => ({
  onboarded: state.onboarding.onboarded,
});

const mapDispatchToProps = {onboard};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Authenticated: React.FC<Props> = props => {
  const history = useHistory();
  return (
      <div className="authenticated wrapper">
        <Navigation />
        <div className="content">
          <Switch>
            <Route exact={true} path={DASHBOARD} component={Dashboard}/>
            <Route exact={true} path={SESSIONS} component={Sessions}/>
            <Route exact={true} path={SETTINGS} component={Settings}/>
            <Route exact={true} path={WALLET} component={Wallet}/>
            <Route path='*'>
              <Redirect to={NOT_FOUND}/>
            </Route>
          </Switch>
        </div>
      </div>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authenticated)
