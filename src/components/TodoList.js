import React, { Fragment } from "react";

import RenderTodo from "./RenderTodo";

export default function TodoList(props) {
  return (
    <Fragment>
      <ul className="todo-list">
        {props.filteredTodos.map((filteredtodo) => (
          <RenderTodo
            key={filteredtodo.id}
            todo={filteredtodo}
            todos={props.todos}
            setTodo={props.setTodo}
          />
        ))}
      </ul>
    </Fragment>
  );
}
