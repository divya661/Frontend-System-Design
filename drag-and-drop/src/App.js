import "./App.css";
import { useState } from "react";

function App() {
  const [widgets1, setWidgets1] = useState([
    "widget A",
    "Widget B",
    "Widget C",
  ]);
  const [widgets2, setWidgets2] = useState([]);

  const handleDragStart = (e,widgetValue,index) => {
    e.dataTransfer?.setData("widgetType",widgetValue);
  };
  const handleDrop = (e) => {
    const widgetType = e.dataTransfer?.getData("widgetType");
    console.log("widgetType",widgetType);
    setWidgets2((prev)=>[...prev,widgetType]);
    setWidgets1((prev)=>{
      let idx = prev.indexOf(widgetType);
      const newValues = [...prev];
      newValues.splice(idx,1);
      return newValues;
    })
  };
  const handleDropOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        width: "100%",
        margin: "12px",
        padding: "12px",
        justifyContent: "space-between",
      }}
    >
      <div
        className="sectionA"
        style={{
          border: "1px solid slategray",
          width: "40%",
        }}
      >
        {widgets1.map((widget, index) => {
          return (
            <div
              style={{
                backgroundColor: "gray",
                opacity: 0.8,
                borderBottom: "1px solid black",
                padding: "12px",
              }}
              className="widget-section-a"
              draggable
              onDragStart={(e) => handleDragStart(e,widget,index)}
            >
              {widget}
            </div>
          );
        })}
      </div>
      <div
        style={{
          border: "1px solid slategray",
          width: "40%",
        }}
        className="sectionB"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDropOver(e)}
      >
        {widgets2.map((widget, index) => {
          return (
            <div className="widget-section-b" draggable>
              {widget}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
