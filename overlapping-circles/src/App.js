import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [elementsCoordinates, setElementsCoordinates] = useState([]);

  useEffect(() => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    };

    const elementsOverlap = (rect1, rect2) => {
      const collide = !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      );

      return collide;
    };

    const draw = (e) => {
      const { clientX, clientY } = e;

      setElementsCoordinates((prevState) => {
        const current = {
          top: clientY - 100,
          left: clientX - 100,
          right: clientX - 100 + 200,
          bottom: clientY - 100 + 200,
          background: "red",
        };

        for (let i = 0; i < prevState.length; i++) {
          if (elementsOverlap(current, prevState[i])) {
            current.background = getRandomColor();
            break;
          }
        }

        return [...prevState, current];
      });
    };

    document.addEventListener("click", draw);
    return () => {
      document.removeEventListener("click", draw);
    };
  }, []);

  const Circle = ({ top, left, background }) => {
    return (
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          opacity: "0.5",
          background,
          top,
          left,
        }}
      ></div>
    );
  };

  return (
    <div className="App">
      {elementsCoordinates.map((e) => (
        <Circle {...e} key={e.top + e.left + e.right} />
      ))}
    </div>
  );
}

export default App;
