import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));

  if (!savedTodos) {
    let emptyTodos = [];
    localStorage.setItem("todos", JSON.stringify(emptyTodos));
    console.log("no saved todos");
  }

  const [todos, setTodo] = useState(savedTodos);

  const [inputText, setInputText] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [sortStatus, setSortStatus] = useState("");

  const [filteredTodos, setTodoFilter] = useState([...savedTodos]);

  const applySort = () => {
    let toBeSortedTodos = [...filteredTodos];
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
      case "":
        setTodoFilter(toBeSortedTodos);
        break;
      default:
        setTodoFilter(toBeSortedTodos);
        break;
    }
  };

  const applyFilter = () => {
    const todoLiteral = [...todos];

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
  const saveTodosInLocal = () => {
    let toBeSavedTodos = [...todos];
    localStorage.setItem("todos", JSON.stringify(toBeSavedTodos));
  };
  //use effect for filter
  useEffect(saveTodosInLocal, [todos]);

  useEffect(applyFilter, [todos, filterStatus]);

  useEffect(applySort, [sortStatus]);

  return (
    <div className="App">
      <div className="content">
        <Header todos={todos} />
        <Form
          setTodo={setTodo}
          inputText={inputText}
          todos={todos}
          setInputText={setInputText}
          setFilterStatus={setFilterStatus}
          setSortStatus={setSortStatus}
        />
        <TodoList
          todos={todos}
          setTodo={setTodo}
          filteredTodos={filteredTodos}
        />
      </div>
    </div>
  );
}

export default App;
