import React from "react";
import {Link, withRouter} from "react-router-dom";
import { HOME, LOGIN } from '../../../constants/routes'
import {DefaultTextField} from '../../../Components/DefaultTextField'
import "../../../assets/styles/pages/onboarding/steps/payout-settings.scss"
import {DefaultSlider} from "../../../Components/DefaultSlider";
import {DEFAULT_STAKE_AMOUNT} from "../../../Services/constants"
import {getCurrentIdentity, registerIdentity, getTransactionsFees} from '../../../api/TequilaApiCalls'
import {
  BasicResponseInterface,
  CurrentIdentityResponseInterface,
  TransactionsFeesResponseInterface
} from "../../../api/TequilApiResponseInterfaces";
import {tequilApiResponseHandler} from '../../../Services/TequilApi/OnboardingResponseHandler'
import {useHistory} from 'react-router'

interface StateInterface {
  walletAddress: string;
  stake: number
}

const PayoutSettings = () => {
  const history = useHistory();
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
    getCurrentIdentity().then(response => {
      handleGetCurrentIdentityResponse(response);
    });
  };

  const handleGetCurrentIdentityResponse = (getCurrentIdentityResponse: CurrentIdentityResponseInterface): void => {
    if (tequilApiResponseHandler(history, getCurrentIdentityResponse)) {
      const id = getCurrentIdentityResponse.identityRef.id;
      getTransactionsFees().then(response => {
        handleGetTransactionFeesResponse(response, id);
      })
    }
  };

  const handleGetTransactionFeesResponse = (getTransactionsFeesResponse: TransactionsFeesResponseInterface, id: string): void => {
    if (tequilApiResponseHandler(history, getTransactionsFeesResponse)) {
      registerIdentity(id, values.walletAddress, values.stake, getTransactionsFeesResponse.transactorFeesResponse.registration).then(response => {
        handleRegisterIdentityResponse(response);
      });
    }
  };

  const handleRegisterIdentityResponse = (registerIdentityResponse: BasicResponseInterface): void => {
    if (tequilApiResponseHandler(history, registerIdentityResponse)) {
    }
    history.push(HOME);
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
          <Link to={LOGIN} className="btn btn-empty skip"><span className="btn-text">Setup later</span></Link>
          <div onClick={handleDone} className="btn btn-filled done"><span className="btn-text">Done</span></div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PayoutSettings);
