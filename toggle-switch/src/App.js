import "./App.css";
import { useState } from "react";
import ToggleSwitch from "./components/ToggleSwitch";
function App() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <div className="App">
      <ToggleSwitch
        onChange={() => setChecked1((prev) => !prev)}
        checked={checked1}
        label={"Toggle 1"}
        rounded={false}
        // ref="toggle1"
      />
      <ToggleSwitch
        onChange={() => setChecked2((prev) => !prev)}
        checked={checked2}
        label={"Toggle 2"}
        rounded={true}
        variant="danger"
        // ref="toggle1"
      />
      <ToggleSwitch
        onChange={() => setChecked3((prev) => !prev)}
        checked={checked3}
        label={"Toggle 3"}
        rounded={true}
        variant="success"
        checkedChildren={<>✓</>}
        unCheckedChildren={<>✗</>}
        // ref="toggle1"
      />
    </div>
  );
}

export default App;
