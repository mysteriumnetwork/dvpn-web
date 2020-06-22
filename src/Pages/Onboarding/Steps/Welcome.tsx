import React from "react";
import {Link} from "react-router-dom";
import {StepCounter} from "../StepCounter";
import "../../../assets/styles/pages/onboarding/steps/welcome.scss"

const Welcome = () => {
  return (
       <div className="step-block">
           <h1 className="step-block--heading">Welcome node runner!</h1>
           <p className="step-block--heading-paragraph">Lets get you up and running. </p>
           <div className="step-block--content">
             <Link to="/onboarding/terms-and-conditions" className="btn btn-filled start"><span className="btn-text">Start node setup</span></Link>
           </div>
         <StepCounter step={1}/>
       </div>
  );
};



export default Welcome;