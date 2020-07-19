import React from "react";
import {Link} from "react-router-dom";
import {DefaultTextField} from '../../../Components/DefaultTextField'
import "../../../assets/styles/pages/onboarding/steps/payout-settings.scss"
import {DefaultSlider} from "../../../Components/DefaultSlider";
import {DEFAULT_STAKE_AMOUNT} from "../../../Services/constants"
import {getCurrentIdentity, registerIdentity} from '../../../api/User'

interface StateInterface {
  walletAddress: string;
  stake: number
}

const PayoutSettings = () => {
  const [values, setValues] = React.useState<StateInterface>({
    walletAddress: '0x...',
    stake: DEFAULT_STAKE_AMOUNT
  });

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handlePricePerGbChanged = (event: any, newValue: number) => {
    setValues({...values, stake: newValue});
  };
  const handleDone = () => {
     getCurrentIdentity().then(response =>{
       if (response.id){
         registerIdentity(response.id, values.walletAddress, values.stake);
       }
     });
  };

  return (
    <div className="step-block payout-settings">
      <h1 className="step-block--heading">Payout settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to receive payments.</p>
      <div className="step-block-content">
        <div className="wallet-input-block">
          <p className="text-field-label top">Ethereum wallet address</p>
          <DefaultTextField
            handleChange={handleTextFieldsChange}
            value={values.walletAddress}
            stateName="walletAddress"
          />
          <p className="text-field-label bottom">Fill in the following information to receive payments.</p>
        </div>
        <div className="wallet-stake-block">
          <p className="wallet-stack-info-p top">Set your stake amount, MYSTT</p>
          <div className="slider-block">
            <p>Stake amount</p>
            <DefaultSlider value={values.stake} handleChange={() => handlePricePerGbChanged} step={1} min={0}
                           max={50} mystSlider={true}/>
          </div>
          <p className="wallet-stack-info-p bottom">In terms to start providing services and ensure smoth and secure
            payouts (settlements)
            in Mysterium Network, node runners should stake small amounts of tokens. If you choose
            default option, initial stake will be 0 and will be increased until minimal amount of 10MYST
            by taking 10% during each promise settlement (payout). </p>
        </div>
        <div className='buttons-block'>
          <Link to="/login" className="btn btn-empty skip"><span className="btn-text">Setup later</span></Link>
          <div onClick={handleDone} className="btn btn-filled done"><span className="btn-text">Done</span></div>
        </div>
      </div>
    </div>
  );
};

export default PayoutSettings;