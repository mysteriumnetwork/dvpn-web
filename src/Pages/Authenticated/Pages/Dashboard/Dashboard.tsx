import React from "react";
import "../../../../assets/styles/pages/authenticated/pages/dashboard.scss"
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/dashboard/logo.svg'
import Header from "../../Components/Header";
import DashboardTopStatsBlock from "./TopStatBlock";
import EarningStatisticBlock from './YearningStatiscticBlock'

const Dashboard = () => {
  return (
      <div className="dashboard wrapper">
        <div className="dashboard--content">
          <Header logo={Logo} name="Dashboard"/>
          <div className="dashboard--top-stats-block">
            <DashboardTopStatsBlock stat="35.34 MYST" name="Unsettled earnings"/>
            <DashboardTopStatsBlock stat="4d 2h" name="Sessions time"/>
            <DashboardTopStatsBlock stat="164.3 GB" name="Transferred"/>
            <DashboardTopStatsBlock stat="54" name="Sessions"/>
            <DashboardTopStatsBlock stat="28" name="Unique clients"/>
          </div>
          <div className="dashboard--earnings-row">
              <EarningStatisticBlock
                month="May"
                mystValue="48.2223 MYST"
                earnings="$48.22"
                residentialPosition="8"
                residentialPositionOf="250"
                countryPosition="1"
                countryPositionOf="8"
                />
          </div>
        </div>
        <div className="dashboard--side">
        </div>
      </div>
  );
};

export default Dashboard;
