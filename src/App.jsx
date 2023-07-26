import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import "./index.css";
import {
  getAllToDos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./utils/HandleApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    getAllToDos(setTodos);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };

  return (
    <div className="container">
      <h1>ToDo App</h1>
      <div className="top">
        <input
          type="text"
          placeholder="Add todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div
          className="add"
          onClick={
            isUpdating
              ? () => updateTodo(todoId, text, setTodos, setText, setIsUpdating)
              : () => addTodo(text, setText, setTodos)
          }
        >
          {isUpdating ? "Update" : "Add"}
        </div>
      </div>

      <div className="list">
        {todos.map((todo) => (
          <ToDo
            text={todo.text}
            key={todo._id}
            updateMode={() => updateMode(todo._id, todo.text)}
            deleteTodo={() => deleteTodo(todo._id, setTodos)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
