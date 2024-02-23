import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [result, setResult] = useState("");
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const storedNotas = JSON.parse(localStorage.getItem(""));
    if (storedNotas) {
      setNotas(storedNotas);
    }
  }, []);

  const handleClickNota = (index) => {
    const clickedNota = notas[index];
    setNumber1(clickedNota.number1);
    setNumber2(clickedNota.number2);
    setCurrentOperation(clickedNota.currentOperation);
    setResult(clickedNota.result);
  };

  function allClear() {
    setNumber1("");
    setNumber2("");
    setCurrentOperation("");
    setResult("");
  }

  function clickNumber(val) {
    if (currentOperation === "") {
      setNumber1(prevNumber => prevNumber + val);
    } else {
      setNumber2(prevNumber => prevNumber + val);
    }
  }

  function clickOperation(val) {
    setCurrentOperation(val);
  }

  function getResult() {
    let calculatedResult;
    switch (currentOperation) {
      case "+":
        calculatedResult = Number(number1) + Number(number2);
        break;
      case "-":
        calculatedResult = Number(number1) - Number(number2);
        break;
      case "*":
        calculatedResult = Number(number1) * Number(number2);
        break;
      case "/":
        calculatedResult = Number(number1) / Number(number2);
        break;
      default:
        return;
    }

    setResult(calculatedResult);

    const nuevaOperacion = { number1, number2, currentOperation, result: calculatedResult };
    const updatedNotas = [...notas, nuevaOperacion];
    setNotas(updatedNotas);
    localStorage.setItem("notas", JSON.stringify(updatedNotas));
  }

  return (
    <div className="App">
      <h1 className="title">Calculadora</h1>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{currentOperation ? number1 + currentOperation + number2 : result}</div>
          <div className="current-operand">{result ? result : (!currentOperation ? number1 : currentOperation + number2)}</div>
        </div>
        <button onClick={allClear} className="span-two">AC</button>
        <button onClick={() => { }}>DEL</button>
        <button onClick={() => { clickOperation("/") }}>/</button>
        <button onClick={() => { clickNumber(7) }}>7</button>
        <button onClick={() => { clickNumber(8) }}>8</button>
        <button onClick={() => { clickNumber(9) }}>9</button>
        <button onClick={() => { clickOperation("*") }}>*</button>
        <button onClick={() => { clickNumber(4) }}>4</button>
        <button onClick={() => { clickNumber(5) }}>5</button>
        <button onClick={() => { clickNumber(6) }}>6</button>
        <button onClick={() => { clickOperation("+") }}>+</button>
        <button onClick={() => { clickNumber(1) }}>1</button>
        <button onClick={() => { clickNumber(2) }}>2</button>
        <button onClick={() => { clickNumber(3) }}>3</button>
        <button onClick={() => { clickOperation("-") }}>-</button>
        <button onClick={() => { clickNumber(".") }}>.</button>
        <button onClick={() => { clickNumber(0) }}>0</button>
        <button onClick={getResult} className="span-two">=</button>
      </div>

      <div id='history'>
        <h3>Lista</h3>
        {notas.length === 0 ? (
          "No hay ninguna operacion realizada"
        ) : (
          <ol>
            {notas.map((item, index) => {
              return (
                <li key={index} onClick={() => handleClickNota(index)}>
                  {item.number1}{item.currentOperation}{item.number2} = {item.result}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
export default App;
