import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_TO_BE_EDITED_REQUEST,
  EDIT_TODO_REQUEST,
} from "../../redux/actions/types";
import StarRating from "../StarRating";

function EditForm(props) {
  const todo = useSelector((state) => state.todos.toBeEdited);
  const [inputState, setInputState] = useState({
    todo: todo.todo,
    importance: todo.importance,
  });
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputState);
    dispatch({
      type: EDIT_TODO_REQUEST,
      payload: { id: todo._id, body: inputState },
    });
    props.setEditToggler(false);
  };

  return (
    <Fragment>
      <div className="editform">
        <form onSubmit={submitHandler}>
          <h1>Edit Todo:</h1>
          <div className="form-group">
            <label htmlFor="">Task:</label>
            <input
              placeholder={todo.todo}
              value={inputState.todo}
              onChange={(e) =>
                setInputState({
                  ...inputState,
                  todo: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Importance :</label>
            <StarRating setInputState={setInputState} inputState={inputState} />
          </div>
          <div className="button-group">
            <button type="submit" className="blue">
              Edit Todo
            </button>
            <button
              type="reset"
              className="red"
              onClick={() => {
                props.setEditToggler(false);
                dispatch({ type: CLEAR_TO_BE_EDITED_REQUEST });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default EditForm;
