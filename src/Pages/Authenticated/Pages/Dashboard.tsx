import React from "react";
import "../../../assets/styles/pages/authenticated/pages/dashboard.scss"
import {ReactComponent as Logo} from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import Header from "../Components/header";

const Dashboard = () => {
  return (
      <div className="dashboard wrapper">
        <div className="dashboard--content">
          <Header logo={Logo} name="Dashboard"/>
        </div>
        <div className="dashboard--side">
        </div>
      </div>
  );
};

export default Dashboard;
