import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO_REQUEST } from "../../redux/actions/types";
import StarRating from "../StarRating";

function AddTodoModal(props) {
  const [inputState, setInputState] = useState({ todo: "", importance: null });
  const [messageAlert, setAlertMessage] = useState(null);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (inputState.importance !== null) {
      dispatch({ type: ADD_TODO_REQUEST, payload: { ...inputState } });
      setInputState({ todo: "", importance: null });
    } else {
      setAlertMessage("Rate the importance");
      setTimeout(() => setAlertMessage(null), 1500);
    }
  }

  function cancelModal() {
    setInputState({ todo: "", importance: null });
  }

  function handleInputChange(e) {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="formModalWrapper">
      <li>Add Task from down below...</li>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task :</label>
          <input
            type="text"
            name="todo"
            onChange={handleInputChange}
            value={inputState.todo}
            placeholder="Enter your task"
            required
          />
        </div>
        <div className="form-group">
          <label>Importance: </label>
          <StarRating
            setInputState={setInputState}
            inputState={inputState}
            messageAlert={messageAlert}
          />
          <p>Rate importance of the task</p>
        </div>
        <div className="button-group">
          <button type="submit" className="blue">
            Add Todo
          </button>
          <button type="reset" className="red" onClick={cancelModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodoModal;
