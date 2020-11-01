import React, { Fragment } from "react";

import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  DELETE_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  ADD_TO_BE_EDITED_TODO_REQUEST,
} from "../../redux/actions/types";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function RenderTodo(props) {
  const dispatch = useDispatch();

  const deleteTodo = () => {
    console.log(props.todo._id);
    dispatch({ type: DELETE_TODO_REQUEST, payload: props.todo._id });
  };
  const completeTodo = () => {
    dispatch({
      type: EDIT_TODO_REQUEST,
      payload: {
        id: props.todo._id,
        body: { completed: !props.todo.completed },
      },
    });
  };

  return (
    <Fragment>
      {!props.editTodoToggled ? (
        <div className={`todo ${props.todo.completed ? "completed" : ""}`}>
          <div className="checkbox">
            <input
              type="checkbox"
              id={`checkbox${props.todo._id}`}
              checked={props.todo.completed}
              onChange={completeTodo}
            />
            <label for={`checkbox${props.todo._id}`}></label>
          </div>
          <p className="todo-item">{props.todo.todo}</p>

          <div className="todo-btn-group">
            <button
              className="edit-btn"
              onClick={() => {
                props.setEditToggler(true);
                dispatch({
                  type: ADD_TO_BE_EDITED_TODO_REQUEST,
                  payload: props.todo,
                });
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={deleteTodo} className="delete-btn">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default RenderTodo;
