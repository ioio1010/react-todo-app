import React from "react";
import classes from "./CustomInput.module.css";

const CustomInput = (props) => {
  let classesList = [classes.customInput];
  if (props.classnames) classesList = [...classesList, props.classnames];

  return <input className={classesList.join(" ")} {...props} />;
};

export default CustomInput;
