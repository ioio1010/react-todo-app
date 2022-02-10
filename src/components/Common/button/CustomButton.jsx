import React from "react";
import classes from "./CustomButton.module.css";

const CustomButton = (props) => {
  let classesList = [classes.customButton];
  if (props.classnames) classesList = [...classesList, props.classnames];

  return (
    <button className={classesList.join(" ")} {...props}>
      {props.children}
    </button>
  );
};

export default CustomButton;
