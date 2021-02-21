import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: "#EEEEEE",
      padding: theme.spacing(3),
    },
}));

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        Share Wisdom&nbsp;&nbsp;
        {new Date().getFullYear()}        
      </Typography>
    );
}
  
const Footer = () => {
    const classes = useStyles();
    return(
        <>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </>
    )
}

export default Footer;

