import React from "react";
import { Spring } from "react-spring/renderprops";
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
    <div className="header-wrapper">
      <h1 className="header">My ToDo list</h1>

      <Spring
        config={{ duration: 1500 }}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {(prop) => (
          <div style={prop}>
            <div className="overview">
              <div className="total-todos">
                <TotalTodos />
              </div>
              <div className="completed-todos">
                <CompletedTodos />
              </div>
            </div>
          </div>
        )}
      </Spring>
    </div>
  );
}

export default Header;
