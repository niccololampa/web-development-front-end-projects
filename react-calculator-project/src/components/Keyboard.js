import React from 'react';
import Keypads from './Keypads';
import './Keyboard.css';

// Keyboard Component collection of Keypads

function Keyboard(props) {
  const {
    handleNumClick,
    handleDecimal,
    handleOperations,
    handleButtonEquals,
    handleButtonReset
  } = props;

  return (
    <div className="keyboard">
      <div className="column-one">
        <div className="normal-rows">
          <Keypads
            buttonId="clear"
            name="Clear"
            buttonValue="AC"
            classStyle="clear"
            handleButtonClick={handleButtonReset}
          />
          <Keypads
            buttonId="multiply"
            name="/"
            buttonValue="/"
            classStyle="operation"
            handleButtonClick={handleOperations}
          />
          <Keypads
            buttonId="times"
            name="*"
            buttonValue="*"
            classStyle="operation"
            handleButtonClick={handleOperations}
          />
        </div>
        <div className="normal-rows">
          <Keypads
            buttonId="seven"
            name="7"
            buttonValue={7}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="eight"
            name="8"
            buttonValue={8}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="nine"
            name="9"
            buttonValue={9}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
        </div>
        <div className="normal-rows">
          <Keypads
            buttonId="four"
            name="4"
            buttonValue={4}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="five"
            name="5"
            buttonValue={5}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="six"
            name="6"
            buttonValue={6}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
        </div>
        <div className="normal-rows">
          <Keypads
            buttonId="one"
            name="1"
            buttonValue={1}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="two"
            name="2"
            buttonValue={2}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="three"
            name="3"
            buttonValue={3}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
        </div>
        <div className="bottom-row">
          <Keypads
            buttonId="zero"
            name="0"
            buttonValue={0}
            classStyle="calc-num"
            handleButtonClick={handleNumClick}
          />
          <Keypads
            buttonId="decimal"
            name="."
            buttonValue="."
            classStyle="calc-num"
            handleButtonClick={handleDecimal}
          />
        </div>
      </div>
      <div className="column-two">
        <Keypads
          buttonId="subtract"
          name="-"
          buttonValue="-"
          classStyle="subtract"
          handleButtonClick={handleOperations}
        />
        <Keypads
          buttonId="plus"
          name="+"
          buttonValue="+"
          classStyle="plus"
          handleButtonClick={handleOperations}
        />
        <Keypads
          buttonId="equals"
          name="Enter"
          buttonValue="="
          classStyle="equals"
          handleButtonClick={handleButtonEquals}
        />
      </div>
    </div>
  );
}

export default Keyboard;
