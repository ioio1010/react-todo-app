import React from "react";
import classes from "./CustomButton.module.css";

const CustomButton = (props) => {
  return (
    <button {...props} className={`${props.className} ${classes.customButton}`}>
      {props.children}
    </button>
  );
};

export default CustomButton;
