import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [time, setTime] = useState(null);
  const timerId = useRef();

  const getDeadlineTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
  };

  const clearTimer = (e) => {
    setTime("00:00:20");
    if (timerId.current) clearInterval(timerId);
    timerId.current = setInterval(() => {
      const totalTime = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((totalTime / 1000) % 60);
      const minutes = Math.floor((totalTime / 1000 / 60) % 60);
      const hours = Math.floor((totalTime / 3600 / 1000) % 24);

      if (totalTime >= 0) {
        setTime(
          (hours > 9 ? hours : "0" + hours) +
            ":" +
            (minutes > 9 ? minutes : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
      }
    }, 1000);
  };

  const onReset = () => {
    clearTimer(getDeadlineTime());
  };

  useEffect(() => {
    onReset();

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div className="App">
      <div>{time}</div>
      <button type="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
