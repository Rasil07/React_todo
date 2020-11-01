import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { Transition, config } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import RenderTodo from "./RenderTodo";
import EditForm from "../Form/EditForm";

export default function TodoList() {
  const allTodo = useSelector((state) => state.todos.todos);
  const [fileteredTodo, setTodoFilter] = useState([...allTodo]);

  const [filterClicked, setFilterToggle] = useState(false);
  const [sortClicked, setSortToggle] = useState(false);

  //initialize states and constants
  const [currentPage, setCurrentPage] = useState(1);

  const [filterStatus, setFilter] = useState("all");
  const [sortStatus, setSort] = useState("---");

  const [editTodoToggled, setEditToggler] = useState(false);

  useEffect(() => {
    setTodoFilter([...allTodo]);
  }, [allTodo]);

  const itemsPerPage = 6;
  const totalPage = Math.ceil(fileteredTodo.length / itemsPerPage);

  //paging logic
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = fileteredTodo.slice(indexOfFirstTodo, indexOfLastTodo);

  function changeCurrentPage(value) {
    setCurrentPage(currentPage + value);
  }
  useEffect(() => setCurrentPage(1), [totalPage]);

  const applySort = () => {
    let toBeSortedTodos = [...fileteredTodo];
    switch (sortStatus) {
      case "importance":
        setTodoFilter(
          toBeSortedTodos.sort((a, b) => b.importance - a.importance)
        );
        break;
      case "name":
        setTodoFilter(
          toBeSortedTodos.sort((a, b) => a.todo.localeCompare(b.todo))
        );
        break;
      case "---":
        setTodoFilter(toBeSortedTodos);
        break;
      default:
        setTodoFilter(toBeSortedTodos);
        break;
    }
  };

  const applyFilter = () => {
    const todoLiteral = [...allTodo];

    switch (filterStatus) {
      case "all":
        setTodoFilter(todoLiteral);
        break;
      case "completed":
        setTodoFilter(todoLiteral.filter((todo) => todo.completed === true));
        break;
      case "uncomplete":
        setTodoFilter(todoLiteral.filter((todo) => todo.completed === false));
        break;
      default:
        setTodoFilter(todoLiteral);
        break;
    }
  };

  useEffect(applyFilter, [allTodo, filterStatus]);

  useEffect(applySort, [sortStatus]);

  function changeFilter(e) {
    setFilter(e);
    setFilterToggle(false);
  }
  function changeSort(e) {
    console.log("hello", e);
    setSort(e);
    setSortToggle(false);
  }

  return (
    <div className="todo-wrapper">
      <div className="order-todo">
        <div className="filter">
          <label>Filter by: &nbsp;</label>

          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={() => setFilterToggle(!filterClicked)}
            >
              {filterStatus}
              {filterClicked ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
            <div
              className={
                "dropdown-content" + `-${filterClicked ? "show" : "hide"}`
              }
            >
              <a className="dropdown-item" onClick={() => changeFilter("all")}>
                All
              </a>
              <a
                className="dropdown-item"
                onClick={() => changeFilter("completed")}
              >
                Completed
              </a>
              <a
                className="dropdown-item"
                onClick={() => changeFilter("uncomplete")}
              >
                Uncompleted
              </a>
            </div>
          </div>
        </div>

        <div className="sort">
          <label>Sort: &nbsp;</label>

          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={() => setSortToggle(!sortClicked)}
            >
              {sortStatus}
              {sortClicked ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
            <div
              className={
                "dropdown-content" + `-${sortClicked ? "show" : "hide"}`
              }
            >
              <a
                className="dropdown-item"
                value=""
                onClick={() => changeSort("---")}
              >
                ---
              </a>
              <a
                className="dropdown-item"
                value="importance"
                onClick={() => changeSort("importance")}
              >
                Importance (Desc)
              </a>
              <a
                className="dropdown-item"
                value="name"
                onClick={() => changeSort("name")}
              >
                Name (Asc)
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul className="todo-list">
        {!editTodoToggled ? (
          <Transition
            config={{ mass: 1.5, tension: 150, friction: 12 }}
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
                  setEditToggler={setEditToggler}
                  editTodoToggled={editTodoToggled}
                />
              </div>
            )}
          </Transition>
        ) : (
          <div className="editDiv">
            <EditForm setEditToggler={setEditToggler} />
          </div>
        )}
      </ul>
      <div className="pages">
        {currentPage > 1 ? (
          <button
            className="pagination-btn"
            onClick={() => changeCurrentPage(-1)}
          >
            <FontAwesomeIcon icon={faChevronUp} size="7x" color="#fff" />
          </button>
        ) : (
          <button className="pagination-btn disabled">
            <FontAwesomeIcon icon={faChevronUp} size="7x" color="#696969" />
          </button>
        )}
        <p className="page-number">{currentPage}</p>
        {currentPage < totalPage ? (
          <button
            className="pagination-btn"
            onClick={() => changeCurrentPage(1)}
          >
            <FontAwesomeIcon icon={faChevronDown} size="7x" color="#fff" />
          </button>
        ) : (
          <button className="pagination-btn disabled">
            <FontAwesomeIcon icon={faChevronDown} size="7x" color="#696969" />
          </button>
        )}
      </div>
      <div className="page-horizontal">
        {currentPage > 1 ? (
          <button
            className="pagination-btn"
            onClick={() => changeCurrentPage(-1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} color="#fff" />
          </button>
        ) : (
          <button className="pagination-btn disabled">
            <FontAwesomeIcon icon={faChevronLeft} color="#696969" />
          </button>
        )}
        <p className="page-number">{currentPage}</p>
        {currentPage < totalPage ? (
          <button
            className="pagination-btn"
            onClick={() => changeCurrentPage(1)}
          >
            <FontAwesomeIcon icon={faChevronRight} color="#fff" />
          </button>
        ) : (
          <button className="pagination-btn disabled">
            <FontAwesomeIcon icon={faChevronRight} color="#696969" />
          </button>
        )}
      </div>
    </div>
  );
}
