import React from "react";
import Header from "../../Components/Header";
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/wallet/logo.svg'

const Wallet = () => {
  return (
    <div className="wallet wrapper">
      <div className="wallet--content">
        <Header logo={Logo} name="Wallet"/>
      </div>
    </div>
  );
};

export default Wallet;
