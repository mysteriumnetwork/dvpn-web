import React from "react";
import "../../../assets/styles/pages/onboarding/_welcome.scss"
import { Grid, Box, Button } from "@material-ui/core";

const Welcome = () => {
  return (
    <Grid item xs={6}>
      <Box textAlign="center">
        <h1 className="heading">Welcome node runner!</h1>
        <p className="heading-extra-p">Lets get you up and running. </p>
        <div className="content welcome">
          <Button className="empty-btn">asdasd </Button>
          <Button className="filled-btn">asdasd </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default Welcome;