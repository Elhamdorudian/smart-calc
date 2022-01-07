import Keypad from "../keypad";
import Screen from "../screen";
import s from "./calculator.module.css";
import { useState } from "react";

const Calculator = () => {
  const [operand1, setOperand1] = useState("0");
  const [operand2, setOperand2] = useState("0");
  const [operator, setOperator] = useState("");
  const [equal, setEqual] = useState(false);
  const [clr, setClr] = useState(false);
  const [putNeg, setPutNeg] = useState(false);
  const [zero, setZero] = useState(false);

  //----------- simple calculator -----------//
  const calculator = (a, b, operator) => {
    switch (operator) {
      case "+":
        return (Number(a) + Number(b)).toString();
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "÷":
        return a / b;
      default:
        return "";
    }
  };

  return (
    <div className={s.wrapper}>
      <p className={s.title}>My Simple Calculator</p>
      <div className={s.calculator}>
        <Screen
          operand1={operand1}
          operand2={operand2}
          operator={operator}
          calculator={calculator}
          equal={equal}
          clr={clr}
          putNeg={putNeg}
          zero={zero}
        />
        <Keypad
          operand1={operand1}
          operand2={operand2}
          operator={operator}
          setOperand1={setOperand1}
          setOperand2={setOperand2}
          setOperator={setOperator}
          calculator={calculator}
          setEqual={setEqual}
          setClr={setClr}
          putNeg={putNeg}
          setPutNeg={setPutNeg}
          setZero={setZero}
        />
      </div>
    </div>
  );
};

export default Calculator;
