import React from "react";
import classes from "./CustomLoader.module.css";

const CustomLoader = (props) => {
  let classesList = [classes.loader];
  if (props.classnames) classesList = [...classesList, props.classnames];

  return <div className={classesList.join(" ")} {...props}></div>;
};

export default CustomLoader;
