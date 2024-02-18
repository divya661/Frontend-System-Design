import { useState, useEffect, useCallback } from "react";
import Row from "./Row";
import { submit } from "./api";

export default function App() {
  const [totalRow, setTotalRows] = useState(1);
  const [finalRow, setFinalRow] = useState({
    input1: 0,
    input2: 0,
    sum: 0,
  });

  const [allRows, setAllRows] = useState([]);

  const updateFinalSum = useCallback((currentRow, rowIdx) => {
    setAllRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIdx] = { ...currentRow };
      return newRows;
    });
  }, []);

  useEffect(() => {
    const newFinalRow = {
      input1: allRows.reduce((acc, cur) => acc + cur.input1, 0),
      input2: allRows.reduce((acc, cur) => acc + cur.input2, 0),
      sum: allRows.reduce((acc, cur) => acc + cur.sum, 0),
    };
    setFinalRow(newFinalRow);
  }, [allRows]);

  const getAllRows = useCallback(() => {
    const arr = new Array(totalRow).fill(0);
    return arr.map((value, index) => (
      <Row key={index} updateAllRows={updateFinalSum} rowIdx={index} />
    ));
  }, [totalRow, updateFinalSum]);

  const addRow = () => {
    setTotalRows(totalRow + 1);
  };

  const clearForm = () => {
    setTotalRows(0);
    setFinalRow({
      input1: 0,
      input2: 0,
      sum: 0,
    });
    setAllRows([]);
  };

  const handleSubmit = () => {
    submit({
      finalRow,
      allRows,
    }).then((responseData) => console.log(responseData));
    clearForm();
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>{getAllRows()}</div>
      <div>
        <span>{finalRow.input1}</span>
        <span>+</span>
        <span>{finalRow.input2}</span>
        <span>=</span>
        <span>{finalRow.sum}</span>
      </div>
      <div>
        <button type="button" onClick={addRow}>
          Add
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
