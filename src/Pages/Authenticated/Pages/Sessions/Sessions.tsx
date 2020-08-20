import React from "react";
import Header from "../../Components/Header";
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/sessions/logo.svg'

const Sessions = () => {
  return (
    <div className="sessions wrapper">
      <div className="sessions--content">
        <Header logo={Logo} name="Sessions"/>
      </div>
    </div>
  );
};

export default Sessions;
