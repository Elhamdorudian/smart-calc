import s from "./keypad.module.css";
import Button from "../button";
import cx from "classnames";
import { useState } from "react";

const Keypad = ({
  operand1,
  operand2,
  setOperand1,
  setOperand2,
  setOperator,
  operator,
  setEqual,
  setClr,
  calculator,
  putNeg,
  setPutNeg,
  setZero,
}) => {
  const [calc, setCalc] = useState("0");

  //-------------- +/- ----------------//

  const handleClear = () => {
    setOperand1("0");
    setOperand2("0");
    setOperator("");
    setClr(true);
    setZero(false);
    setPutNeg(false);
  };

  //-------------- +/- ----------------//
  const negatives = (value) => {
    if (value > 0) {
      return -Math.abs(value);
    } else if (value < 0) {
      return Math.abs(value);
    }
    return value;
  };

  const handleNegative = () => {
    if (operator === "") {
      setOperand1(negatives(operand1));
    } else {
      if (operand2 !== "0") {
        setOperand2(negatives(operand2));
      } else {
        setPutNeg(true);
      }
    }
  };

  //-------------- = ----------------//
  const handleEqual = () => {
    setZero(false);
    if (operand1 !== "0" && operator === "") {
      setEqual(false);
      setCalc((calc) => (calc = operand1));
    } else {
      setEqual(true);
      setCalc((calc) => (calc = calculator(operand1, operand2, operator)));
    }
  };

  //-------------- % ----------------//
  const percentage = (value) => {
    let val = value / 100;
    return val;
  };

  const handlePercentage = () => {
    if (operator === "") {
      let percent = percentage(operand1);
      setOperand1(percent);
    } else if (operand2 !== "0" && calc === "0") {
      let percent = percentage(operand2);
      setOperand2(percent);
    } else if (calc !== "0") {
      if (calc !== operand1) {
        setCalc((calc) => (calc = percentage(calc)));
      } else {
        setOperand2((operand2) => (operand2 = percentage(operand2)));
      }
    }
  };

  const handleButtonClick = (button, e) => {
    //-------checking if the value is Number-------//
    let isNumber = !isNaN(e.target.value);

    if (e.target.value === "C") {
      handleClear();
    } else if (e.target.value === "+/-") {
      handleNegative();
    } else if (e.target.value === "=") {
      handleEqual();
    } else if (e.target.value === "%") {
      handlePercentage();
    } else if (isNumber || e.target.value === ".") {
      setClr(false);
      setEqual(false);
      if (
        (operator === "" && operand1 === "0") ||
        (calc !== "0" && operand2 !== "0")
      ) {
        setCalc("0");
        if (operand2 === ".") {
          setOperand2((operand2) => (operand2 += e.target.value));
        } else {
          setOperand2("0");
          setOperator("");
          setOperand1(e.target.value);
        }

        if (operand1 === "0" && e.target.value === ".") {
          setOperand1(`0${e.target.value}`);
        }
      } else if (operator === "" && operand1 !== "0") {
        setOperand1((prevOperand1) => (prevOperand1 += e.target.value));
      } else {
        if (operator !== "" && operand2 === "0") {
          if (e.target.value === "0") {
            setZero(true);
          }
          if (putNeg) {
            setOperand2(negatives(e.target.value));
          } else {
            setOperand2(e.target.value);
          }
        } else if (operator !== "" && operand2 !== "0") {
          setOperand2((prevOperand2) => (prevOperand2 += e.target.value));
        } else {
          setOperand1(e.target.value);
        }
      }
    } else {
      setEqual(false);
      if (operand2 !== "0") {
        setOperand1((operand1) => (operand1 = calc));
        setOperand2("0");
      }
      setOperator(e.target.value);
    }
  };

  const buttons = [
    { text: "C", operator: true, isDark: true },
    { text: "+/-", operator: true, isDark: true },
    { text: "%", operator: true, isDark: true },
    { text: "÷", operator: true, isDark: true },
    { text: "7", operator: false },
    { text: "8", operator: false },
    { text: "9", operator: false },
    { text: "x", operator: true, isDark: true },
    { text: "4", operator: false },
    { text: "5", operator: false },
    { text: "6", operator: false },
    { text: "-", operator: true, isDark: true },
    { text: "1", operator: false },
    { text: "2", operator: false },
    { text: "3", operator: false },
    { text: "+", operator: true, isDark: true },
    { text: "0", operator: false, isLarge: true },
    { text: ".", operator: false },
    { text: "=", operator: true, isDark: true },
  ];

  return (
    <div className={s.keypad}>
      {buttons.map((button) => (
        <Button
          key={button.text}
          text={button.text}
          operator={button.operator}
          onClick={handleButtonClick}
          className={cx(
            button.isLarge && s["button-2x"],
            button.isDark && s.dark
          )}
        />
      ))}
    </div>
  );
};

export default Keypad;
