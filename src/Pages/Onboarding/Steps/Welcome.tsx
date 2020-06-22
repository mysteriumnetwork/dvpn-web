import React from "react";
import "../../../assets/styles/pages/onboarding/welcome.scss"

const Welcome = () => {
  return (
       <div className="block welcome">
           <h1 className="heading">Welcome node runner!</h1>
           <p className="heading-paragraph">Lets get you up and running. </p>
           <div className="content welcome">
             <div className="btn btn-empty skip"><span className="btn-text">Import existing keystore file</span></div>
             <div className="btn btn-filled download"><span className="btn-text">Start from scratch</span></div>
           </div>
       </div>
  );
};

export default Welcome;