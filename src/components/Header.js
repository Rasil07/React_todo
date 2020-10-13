import React from "react";

function Header(props) {
  function TotalTodos() {
    return <li> Total todos: {props.todos.length}</li>;
  }
  function CompletedTodos() {
    const completedTodos = props.todos.filter(
      (element) => element.completed === true
    );

    return (
      <li>
        {" "}
        {completedTodos.length} out of {props.todos.length} todos completed
      </li>
    );
  }
  return (
    <div style={{ width: "100%", height: "20%" }}>
      <h1 className="header">My ToDo list</h1>
      <div className="overview">
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
