import React from "react";
import "../../../../assets/styles/pages/authenticated/pages/dashboard.scss"
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/dashboard/logo.svg'
import Header from "../../Components/Header";
import DashboardTopStatsBlock from "./TopStatBlock";
import EarningStatisticBlock from './EarningStatiscticBlock'
import EarningGraphBlock from './EarningGraphBlock'
import ServicesBlock from './ServiceBlock'
import SideBlock from '../components/SideBlock'
import {Fade, Modal} from "@material-ui/core";
import {DefaultSlider} from "../../../../Components/DefaultSlider";
import {DEFAULT_PRICE_PER_GB, DEFAULT_PRICE_PER_MINUTE_PRICE} from "../../../../Services/constants";
import {DefaultSwitch} from "../../../../Components/DefaultSwitch";

const Dashboard = () => {
  const [values, setValues] = React.useState({
    open: false,
    modalServiceName: "name",
    pricePerMinute: DEFAULT_PRICE_PER_MINUTE_PRICE,
    pricePerGb: DEFAULT_PRICE_PER_GB,
    partnersOn: true,
    limitOn: false
  });

  const handleOpen = (modalServiceName: string) => {
    setValues({...values, open: true, modalServiceName: modalServiceName})
  };

  const handleClose = () => {
    setValues({...values, open: false})
  };

  const handlePricePerMinuteChanged = (event: any, newValue: number) => {
    setValues({
      ...values,
      pricePerMinute: newValue,
    });
  };

  const handlePricePerGbChanged = (event: any, newValue: number) => {
    setValues({
      ...values,
      pricePerGb: newValue,
    });
  };

  const handlePartnersOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, partnersOn: event.target.checked})
  }

  const handleLimitOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, limitOn: event.target.checked})
  }

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
              openModal={handleOpen}
            />
            <ServicesBlock
              name="OpenVPN"
              type="VPN"
              pricePerMinute="0.005"
              pricePerGb="0.15"
              whiteListed={false}
              turnedOn={false}
              openModal={handleOpen}
            />
          </div>
        </div>
      </div>
      <div className="dashboard--side">
        <SideBlock/>
      </div>
      <Modal
        className="settings-modal"
        open={values.open}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus={true}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={values.open}>
          <div className="settings-modal--block">
            <div className="title">{values.modalServiceName} Settings</div>
            <div className="settings-row">
              <div className="settings-row--slider">
                <p>Price per minute</p>
                <DefaultSlider
                  value={values.pricePerMinute}
                  handleChange={() => handlePricePerMinuteChanged}
                  step={0.001}
                  min={0}
                  max={0.01}
                  disabled={false}
                />
                <div className="bottom-line">
                  <p>0 MYST</p>
                  <p>0.001 MYST</p>
                </div>
              </div>
              <div className="settings-row--slider">
                <p>Price per GB</p>
                <DefaultSlider
                  value={values.pricePerGb}
                  handleChange={() => handlePricePerGbChanged}
                  step={0.001}
                  min={0}
                  max={0.01}
                  disabled={false}
                />
                <div className="bottom-line">
                  <p>0 MYST</p>
                  <p>0.50 MYST</p>
                </div>
              </div>
            </div>
            <div className="partners-block">
              <div className="switch-row">
                <DefaultSwitch tunedOn={values.partnersOn} handleChange={() => handlePartnersOnChange} type="myst"/>
                <p className="text">Only Mysterium verified partner traffic</p>
              </div>
              <p className="under-text">Safe option: traffic vetted via business contracts, unavailable to the general
                public and limited to streaming. This option potentially will give less reward.</p>
            </div>
            <div className="limits-block">
              <DefaultSwitch tunedOn={values.limitOn} handleChange={() => handleLimitOnChange} type="myst"/>
              <p className="text">Limit bandwidth to 5Mb/s</p>
            </div>
            <div className="buttons-block">
              <div onClick={() => handleClose()} className="btn close"><span
                className="btn-text">Close</span>
              </div>
              <div onClick={() => alert()} className="btn btn-filled save"><span
                className="btn-text">Save & Restart</span>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Dashboard;
