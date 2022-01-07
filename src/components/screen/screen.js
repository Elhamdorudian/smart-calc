import s from "./screen.module.css";
import PropTypes from "prop-types";

const Screen = ({
  operand1,
  operand2,
  operator,
  calculator,
  equal,
  clr,
  zero,
}) => {
  let def = 0;
  if (clr) {
    def = "0";
  } else if (equal) {
    def = calculator(operand1, operand2, operator);
  } else if (operand1 === "0" && operand2 === "0" && operator === "") {
    def = "0";
  } else if (operand1 !== "0" && operand2 === "0" && operator === "") {
    def = operand1;
  } else if (operator !== "" && operand2 === "0") {
    if (zero) {
      def = operand1 + operator + operand2;
    } else {
      def = operand1 + operator;
    }
  } else if (operand2 < 0) {
    def = `${operand1}${operator}(${operand2})`;
  } else {
    def = operand1 + operator + operand2;
  }

  return (
    <>
      <div className={s.screen}>{def}</div>
    </>
  );
};

Screen.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Screen.defaultProps = {
  def: "0",
};

export default Screen;
