import React from "react";
import classes from "./ErrorBanner.module.css";
import PropTypes from "prop-types";

const ErrorBanner = ({ text, ...props }) => {
  return (
    <span {...props} className={`${props.className} ${classes.errorBanner}`}>
      {text}
    </span>
  );
};

ErrorBanner.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorBanner;
