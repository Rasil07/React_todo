import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faCheck,
  faTimes,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
function RenderTodo(props) {
  const [editTodo, editTodoToggler] = useState(false);
  const [editText, setEditText] = useState("");

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

  const submitEditTodo = (e) => {
    e.preventDefault();
    props.setTodo(
      props.todos.map((element) => {
        if (element.id === props.todo.id) {
          return {
            ...element,
            todo: editText,
          };
        }
        return element;
      })
    );
    editTodoToggler(false);
  };
  return (
    <Fragment>
      {!editTodo ? (
        <li className={`todo ${props.todo.completed ? "completed" : ""}`}>
          <p className="todo-item" onClick={() => editTodoToggler(true)}>
            {props.todo.todo}
          </p>
          <button onClick={completeTodo} className="check">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={deleteTodo} className="delete">
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </li>
      ) : (
        <div className={`editTodo ${editTodo ? "show" : "hide"}`}>
          <form className="form" onSubmit={submitEditTodo}>
            <div className="form-group">
              <input
                name="todo"
                onChange={(e) => setEditText(e.target.value)}
                required
              />
              <button className="check" type="submit">
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button className="delete" onClick={() => editTodoToggler(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default RenderTodo;
