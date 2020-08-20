import React from "react";
import {Link, withRouter} from "react-router-dom";
import {useHistory} from "react-router";
import "../../../assets/styles/pages/authenticated/components/navigation.scss"
import {ReactComponent as Logo} from '../../../assets/images/authenticated/components/navigation/Logo.svg'
import {ReactComponent as Dashboard} from '../../../assets/images/authenticated/components/navigation/Dashboard.svg'
import {ReactComponent as Sessions} from '../../../assets/images/authenticated/components/navigation/Sessiongs.svg'
import {ReactComponent as Settings} from '../../../assets/images/authenticated/components/navigation/Settings.svg'
import {ReactComponent as Wallet} from '../../../assets/images/authenticated/components/navigation/Wallet.svg'
import {ReactComponent as Chat} from '../../../assets/images/authenticated/components/navigation/Chat.svg'
import {
  DASHBOARD,
  SESSIONS,
  SETTINGS,
  WALLET
} from '../../../constants/routes'


interface NavigationInterface {
  active: string;
}

const Navigation = () => {
  const [values, setValues] = React.useState<NavigationInterface>({
    active: DASHBOARD
  });

  return (
    <div className="navigation wrapper">
      <Link to={DASHBOARD} onClick={() => {setValues({active: DASHBOARD})}} className='navigation--logo'>
        <Logo/>
      </Link>

      <Link to={DASHBOARD}
            onClick={() => setValues({active: DASHBOARD})}
            className={values.active === DASHBOARD ? "navigation--item active" : "navigation--item "}>
        <Dashboard/>
      </Link>
      <Link to={SESSIONS}
            onClick={() => setValues({active: SESSIONS})}
            className={values.active === SESSIONS ? "navigation--item active" : "navigation--item "}>
        <Sessions/>
      </Link>
      <Link to={SETTINGS}
            onClick={() => setValues({active: SETTINGS})}
            className={values.active === SETTINGS ? "navigation--item active" : "navigation--item "}>
        <Settings/>
      </Link>
      <Link to={WALLET}
            onClick={() => setValues({active: WALLET})}
            className={values.active === WALLET ? "navigation--item active" : "navigation--item "}>
        <Wallet/>
      </Link>

      <div className="navigation--chat">
        <Chat/>
      </div>
    </div>
  );
};
export default withRouter(Navigation);