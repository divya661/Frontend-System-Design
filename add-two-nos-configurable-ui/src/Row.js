import React, { useCallback, useEffect, useState } from "react";

const Row = ({ updateAllRows, rowIdx }) => {
  const [row, setRow] = useState({
    input1: 0,
    input2: 0,
    sum: 0,
  });

  const [operation, setOperation] = useState("+");

  const calculateSum = useCallback(() => {
    const sign = operation === "-" ? -1 : 1;
    const sum = row.input1 + sign * row.input2;
    setRow((prev) => {
      return { ...prev, sum };
    });
  }, [operation, row.input1, row.input2]);

  useEffect(() => {
    updateAllRows({ ...row, operation }, rowIdx);
  }, [rowIdx, row, updateAllRows, operation]);

  const handleInputChange = (value, type) => {
    console.log(value, type);
    const newRow = { ...row };
    newRow[type] = value;
    console.log(newRow);
    setRow(newRow);
  };

  useEffect(() => {
    calculateSum();
  }, [row.input1, row.input2, operation, calculateSum]);

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        value={row.input1}
        onChange={(e) => handleInputChange(+e.target.value, "input1")}
      />
      <select value={operation} onChange={handleOperationChange}>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input
        type="number"
        value={row.input2}
        onChange={(e) => handleInputChange(+e.target.value, "input2")}
      />
      <span>=</span>
      <span>{row.sum}</span>
    </div>
  );
};
export default Row;
