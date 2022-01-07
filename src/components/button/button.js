import React from "react";
import s from "./button.module.css";
import cx from "classnames";
import PropTypes from "prop-types";

const Button = ({ text, className, onClick, operator }) => {
  return (
    <button
      title={operator ? "0" : text}
      value={text}
      className={cx(className, s.button)}
      onClick={(e) => onClick(text, e)}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: "",
};

export default Button;
