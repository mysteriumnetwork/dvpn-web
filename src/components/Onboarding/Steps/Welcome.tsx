import React from "react";
import { Grid, Box } from "@material-ui/core";

const Welcome = () => {
  return (
    <Grid item xs={6}>
      <Box textAlign="center">
        <h1 className="heading">Welcome node runner!</h1>
        <p className="heading-extra-p">Lets get you up and running. </p>
        <div className="content welcome">
          asdasd
        </div>
      </Box>
    </Grid>
  );
};

export default Welcome;