import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
function RenderTodo(props) {
  const deleteTodo = () => {
    props.setTodo(
      props.todos.filter((element) => element.id !== props.todo.id)
    );
  };
  const completeTodo = () => {
    props.setTodo(
      props.todos.map((element) => {
        if (element.id === props.todo.id) {
          return {
            ...element,
            completed: !element.completed,
          };
        }
        return element;
      })
    );
  };
  return (
    <div className={`todo ${props.todo.completed ? "completed" : ""}`}>
      <li className="todo-item">{props.todo.todo}</li>
      <button onClick={completeTodo} className="check">
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button onClick={deleteTodo} className="delete">
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
}

export default RenderTodo;
