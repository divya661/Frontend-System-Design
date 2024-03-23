import "./App.css";
import { useEffect, useRef } from "react";

function App() {
   const grid = new Array(6).fill(0);
  
  const boxRefs = useRef({});

  const clickTrackRef = useRef([]);

  const changeColorFn = (index) => {
    console.log(`${index} click`);
    if (clickTrackRef.current.includes(index)) {
      alert("Already clicked");
    }

    console.log(boxRefs.current[index]);
    boxRefs.current[index].style.backgroundColor = "green";
    clickTrackRef.current.push(index);
    console.log(clickTrackRef.current);
    if (clickTrackRef.current.length == grid.length) {
      reverseColor();
    }
  };

  const reverseColor = () => {
    clickTrackRef.current.forEach((val, index) => {
      setTimeout(() => {
        boxRefs.current[val].style.backgroundColor = "red";
      }, 1000 * index);
    });
  };

  return (
    <div className="App">
      {grid.map((curGrid, index) => {
        return (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              padding: "40px",
              margin: "10px",
            }}
          >
            <button
              id={``}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "red",
              }}
              ref={(element) => (boxRefs.current[index] = element)}
              onClick={() => changeColorFn(index)}
            >
              {index}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
