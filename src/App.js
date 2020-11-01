import React, { useEffect, useState } from "react";

import "./main.css";

import { useDispatch, useSelector } from "react-redux";

import {
  CLEAR_MESSAGE_REQUEST,
  GET_ALL_TODO_REQUEST,
} from "./redux/actions/types";
import Header from "./components/Header";
import Form from "./components/Form/Form";
import TodoList from "./components/Todos/TodoList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.todos.message);
  const errors = useSelector((state) => state.todos.errors);
  const [showSideContent, sideContentToggler] = useState(null);

  const loadTodos = useEffect(
    () => dispatch({ type: GET_ALL_TODO_REQUEST }),
    []
  );
  useEffect(() => {
    setTimeout(() => dispatch({ type: CLEAR_MESSAGE_REQUEST }), 2500);
  }, message);

  return (
    <div className="content">
      <div
        className="hamburgerOpen hambutton"
        onClick={() => sideContentToggler(true)}
      >
        {!showSideContent ? <FontAwesomeIcon icon={faArrowRight} /> : null}
      </div>
      <div
        className={`side-content ${
          showSideContent === true
            ? "showSide"
            : showSideContent === false
            ? "hideSide"
            : null
        }`}
      >
        <Header
          sideContentToggler={sideContentToggler}
          showSideContent={showSideContent}
        />
        <Form />
      </div>
      <div className="main-content">
        <div
          className={`alert ${errors || message === null ? "hide" : "show"}`}
        >
          <p>{errors || message}</p>
        </div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
