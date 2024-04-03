import React, { useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";

function App() {
  const [current, setCurrent] = useState(1);
  const onChange = ({ start, end, current }) => {
    setCurrent(current);
  };

  return (
    <div className="App">
      <Pagination
        current={current}
        onChange={onChange}
        totalItems={43}
        perPage={7}
      />
    </div>
  );
}

export default App;
