import React, { Fragment, useState, useEffect } from "react";
// import { useTransition, animated, config } from "react-spring";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import RenderTodo from "./RenderTodo";

export default function TodoList(props) {
  //initialize states and constants
  const [currentPage, setCurrentPage] = useState(1);
  const allTodos = [...props.filteredTodos];
  const itemsPerPage = 5;

  const totalPage = Math.ceil(allTodos.length / itemsPerPage);
  //paging logic
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = allTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  function changeCurrentPage(value) {
    setCurrentPage(currentPage + value);
  }
  useEffect(() => setCurrentPage(1), [totalPage]);

  return (
    <Fragment>
      <ul className="todo-list">
        {
          <Transition
            items={[...currentTodos]}
            keys={currentTodos.map((todo, index) => index)}
            from={{ opacity: 0, transform: "translate3d(-25%, 0px, 0px)" }}
            enter={{ opacity: 1, transform: "translate3d(0%, 0px, 0px)" }}
            leave={{
              opacity: 0,
              height: 0,
              transform: "translate3d(25%, 0px, 0px)",
            }}
          >
            {(item) => (prop) => (
              <div style={prop}>
                <RenderTodo
                  todo={item}
                  todos={props.todos}
                  setTodo={props.setTodo}
                />
              </div>
            )}
          </Transition>
        }
      </ul>
      <div className="pages">
        {currentPage > 1 ? (
          <button
            className="pagination-btn"
            onClick={() => changeCurrentPage(-1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#fff" />
          </button>
        ) : (
          <button className="pagination-btn disabled">
            <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#696969" />
          </button>
        )}
        <p>{currentPage}</p>
        {currentPage < totalPage ? (
          <button
            className="pagination-btn"
            onClick={() => changeCurrentPage(1)}
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" color="#fff" />
          </button>
        ) : (
          <button className="pagination-btn disabled">
            <FontAwesomeIcon icon={faChevronRight} size="2x" color="#696969" />
          </button>
        )}
      </div>
    </Fragment>
  );
}
