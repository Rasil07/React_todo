import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const todos = useSelector((state) => state.todos.todos);
  function TotalTodos() {
    return <li> Total todos: {todos.length}</li>;
  }
  function CompletedTodos() {
    const completedTodos = todos.filter(
      (element) => element.completed === true
    );

    return (
      <li>
        {" "}
        {completedTodos.length} out of {todos.length} todos completed
      </li>
    );
  }

  function toggleSidebar() {
    props.sideContentToggler(false);
    setTimeout(() => props.sideContentToggler(null), 500);
  }

  return (
    <div className="header-wrapper">
      <div className="header-heading">
        <h1 className="header" onClick={toggleSidebar}>
          TODOS
        </h1>
        <div className="hamburgerClose hambutton" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </div>

      <div className="overview">
        <h4>Overview</h4>
        <div className="total-todos">
          <TotalTodos />
        </div>
        <div className="completed-todos">
          <CompletedTodos />
        </div>
      </div>
    </div>
  );
}

export default Header;
