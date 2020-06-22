import React from "react";
import { Grid, Box} from "@material-ui/core";

const Welcome = () => {
  return (
       <div className="block welcome">
           <h1 className="heading">Welcome node runner!</h1>
           <p className="heading-paragraph">Lets get you up and running. </p>
           <div className="content welcome"></div>
       </div>
  );
};

export default Welcome;