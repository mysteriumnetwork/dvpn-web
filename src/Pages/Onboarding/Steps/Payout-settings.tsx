import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import { DefaultTextField } from '../../../Components/DefaultTextField'
import "../../../assets/styles/pages/onboarding/steps/payout-settings.scss"

interface State {
  walletAddress: string;
  walletAddressRepeat: string;
}

const PayoutSettings = () => {
  const [values, setValues] = React.useState<State>({
    walletAddress: '0x...',
    walletAddressRepeat: '0x...',
  });
  const handleTextFieldsChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className="step-block payout-settings">
      <h1 className="step-block--heading">Payout settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to receive payments.</p>
      <div className="step-block-content">
        <div className="wallet-input-block">
          <p className="text-field-label">Wallet address</p>
          <DefaultTextField
            handleChange={handleTextFieldsChange}
            value={values.walletAddress}
            stateName="password"
          />
          <p className="text-field-label">Fill in the following information to receive payments.</p>
        </div>
        <div className="wallet-repeat-input-block">
          <p className="text-field-label">Wallet address</p>
          <DefaultTextField
            handleChange={handleTextFieldsChange}
            value={values.walletAddressRepeat}
            stateName="passwordRepeat"
          />
        </div>
        <div className='buttons-block'>
          <Link to="/onboarding/" className="btn btn-empty skip"><span className="btn-text">Setup later</span></Link>
          <Link to="/onboarding/" className="btn btn-filled done"><span className="btn-text">Done</span></Link>
        </div>
      </div>
      <StepCounter step={6}/>
    </div>
  );
};

export default PayoutSettings;