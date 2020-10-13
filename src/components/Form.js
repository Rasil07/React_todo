import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Form(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.setTodo([
      ...props.todos,
      {
        id: Math.floor(Math.random() * 1000),
        todo: props.inputText,
        importance: parseInt(Math.floor(Math.random() * 11)),
        completed: false,
      },
    ]);
    props.setInputText("");
  }

  function inputHandler(e) {
    props.setInputText(e.target.value);
  }

  function todoFilterHandler(e) {
    props.setFilterStatus(e.target.value);
  }

  function todoSortHandler(e) {
    props.setSortStatus(e.target.value);
  }

  return (
    <Fragment>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="todo"
            value={props.inputText}
            onChange={inputHandler}
            required
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
      <div className="order-todo">
        <label>Filter by:</label>
        <select onClick={todoFilterHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncomplete">Uncompleted</option>
        </select>{" "}
        &nbsp;
        <label>Sort by:</label>
        <select onClick={todoSortHandler}>
          <option value="">---</option>
          <option value="importance">Importance(Desc)</option>
          <option value="name">Name(Asc)</option>
        </select>
      </div>
    </Fragment>
  );
}

export default Form;
