import React, { useState } from 'react';
import styled from 'styled-components';

const Calculator = () => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const ops = ['/', '*', '+', '-', '.'];
  const operation = ['÷', 'x', '+', '-', '·'];

  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const onUpdateCalc = value => {
    if ((ops.includes(value) && calc === '') || (ops.includes(value) && ops.includes(calc.slice(-1)))) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const onCalc = () => {
    setCalc(eval(calc).toString());
  };

  const onDelete = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value)
  };

  const onAllClear = () => {
    setResult('');
    setCalc('');
  };

  const onClear = () => {
    setCalc('');
  };
  
  return (
    <CalcWrapper>
      <CalcContainer>
        <Display>
          <div>
            <span>({result})</span> {calc || '0'}
          </div>
        </Display>
        <Delete>
          <button onClick={onAllClear}>AC</button>
          <button onClick={onClear}>C</button>
          <button onClick={onDelete}>←</button>
        </Delete>
        <ButtonWrapper>
          <Digits>
            {digits.map((num, index) => (
              <button key={index} onClick={() => onUpdateCalc(digits[index])}>{num}</button>
            ))}
            <button onClick={onCalc}>=</button>
          </Digits>
          <Operator>
            {ops.map((oper, index) => (
              <button key={index} onClick={() => onUpdateCalc(ops[index])}>{operation[index]}</button>
            ))}
          </Operator>
        </ButtonWrapper>
      </CalcContainer>
    </CalcWrapper>
  );
};

const CalcWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 16px;
`;

const CalcContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: var(--black);
  overflow: hidden;
  box-shadow: 0 2px 64px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  button {
    appearance: none;
    border: none;
    outline: none;
    color: var(--white);
    font-size: 20px;
    padding: 16px;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const Display = styled.div`
  padding: 24px;
  text-align: right;
  background: var(--black);
  color: var(--dark);
  font-size: 24px;
  font-weight: 300;
  div {
    background: #ccc;
    border-radius: 4px;
    padding: 8px;
    span {
      font-size: 14px;
      color: #888;
    }
  }
`;

const Delete = styled.div`
  display: flex;
  button {
    flex: 1 1 0%;
    background: var(--pink);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Digits = styled.div`
  display: flex;
  flex-wrap: wrap;
  button {
    flex: 1 1 33.333%;
    max-width: 33.333%;
    background: var(--white);
    color: #333;
  }
`;

const Operator = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 33.333%;
  button {
    background: var(--magenta);
    font-weight: 700;
  }
`;

export default Calculator;