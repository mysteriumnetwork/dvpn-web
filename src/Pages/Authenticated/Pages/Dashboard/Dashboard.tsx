import React from "react";
import "../../../../assets/styles/pages/authenticated/pages/dashboard.scss"
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/dashboard/logo.svg'
import Header from "../../Components/Header";
import DashboardTopStatsBlock from "./TopStatBlock";
import EarningStatisticBlock from './EarningStatiscticBlock'
import EarningGraphBlock from './EarningGraphBlock'
import ServicesBlock from './ServiceBlock'
import SideBlock from '../components/SideBlock'

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
                <EarningGraphBlock month="May"/>
          </div>
          <div className="dashboard--services-row">
            <div className="heading-row">
              <p className="heading">Services</p>
              <div className="status-circle failed"></div>
              <p className="heading info">NAT status</p>
              <p className="status failed">Failed</p>
              <a href="#" className="link">How to fix this?</a>
            </div>
            <div className="services-blocks-row">
              <ServicesBlock
                name="WireGuard"
                type="VPN"
                pricePerMinute="0.005"
                pricePerGb="0.15"
                whiteListed={true}
                turnedOn={true}
                />
              <ServicesBlock
                name="OpenVPN"
                type="VPN"
                pricePerMinute="0.005"
                pricePerGb="0.15"
                whiteListed={false}
                turnedOn={false}
              />
            </div>
          </div>
        </div>
        <div className="dashboard--side">
            <SideBlock/>
        </div>
      </div>
  );
};

export default Dashboard;
