import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// @material-ui/icons

// core components

import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import Button from "./Button.js";
import Parallax from "./Parallax.js";

import styles from "./landingPagedesign.js";



const useStyles = makeStyles(styles);

const  LandingPage = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={require("./landing-bg.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
               {JSON.stringify(props.user, null , 2)}
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
     
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(LandingPage);

