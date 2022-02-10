import React from "react";
import classes from "./CustomLoader.module.css";

const CustomLoader = (props) => {
  return (
    <div {...props} className={`${props.className} ${classes.loader}`}></div>
  );
};

export default CustomLoader;
