import React from "react";
import {Link} from "react-router-dom";
import "../../../assets/styles/pages/onboarding/steps/welcome.scss"

const Welcome = () => {
  return (
       <div className="step-block welcome">
           <h1 className="step-block--heading">Welcome node runner!</h1>
           <p className="step-block--heading-paragraph">Lets get you up and running. </p>
           <div className="step-block-content">
             <Link to="/onboarding/terms-and-conditions" className="btn btn-filled btn-center start"><span className="btn-text">Start node setup</span></Link>
           </div>
       </div>
  );
};



export default Welcome;