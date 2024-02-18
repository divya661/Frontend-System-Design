import "./App.css";
import { useState } from "react";

function App() {
  const [inputValue] = useState();
  const [todoList, setTodoList] = useState([]);

  const handleInput = (e) => {
    if (e.key === "Enter") {
      setTodoList((prev) => [
        ...prev,
        { title: e.target.value, completed: false, id: Date.now() },
      ]);
    }
  };

  const toggleComplete = (idx) => {
    const newTodo = todoList.map((todo, todoIdx) => {
      if (todoIdx === idx) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return { ...todo };
      }
    });
    setTodoList(newTodo);
  };

  const updateTitleChange = (value, idx) => {
    const newTodo = todoList.map((todo, todoIdx) => {
      if (todoIdx === idx) {
        return {
          ...todo,
          title: value,
        };
      } else {
        return { ...todo };
      }
    });
    setTodoList(newTodo);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        id="todo-title-input"
        onKeyDown={(e) => handleInput(e)}
      />
      <ul
        style={{
          width: "300px",
          gap: "10px",
        }}
      >
        {todoList.map((todoItem, idx) => {
          return (
            <li
              key={todoItem.id}
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                gap: "10px",
                height: "24px",
                padding: "4px",
              }}
            >
              <button
                style={{
                  display: "inline-block",
                  border: "1px solid green",
                  borderRadius: "50%",
                  width: "10%",
                  height: "100%",
                  fontSize: "12px",
                  color: "green",
                }}
                onClick={() => toggleComplete(idx)}
              >
                {todoItem.completed ? "✔" : ""}
              </button>
              <span
                style={{
                  width: "80px",
                }}
                onDoubleClick={(e) => updateTitleChange(e.target.value, idx)}
              >
                {todoItem.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
