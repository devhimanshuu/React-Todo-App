import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput"; // Importing the TaskInput component
import Todo from "./Todo"; // Importing the Todo component

// Function component TaskList for managing the list of todos
function TaskList() {
  const [todos, setTodos] = useState([]); // State to manage the list of todos

  // Function to add a new todo to the list
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return; // Return if the todo text is empty or contains only whitespace
    }

    const newTodos = [todo, ...todos]; // Create a new array with the new todo added at the beginning

    setTodos(newTodos); // Update the todos state with the new array
    console.log(...todos); // Log the current todos to the console
  };

  // useEffect to update local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(todos)); // Store the todos in local storage as "taskList"
  }, [todos]);

  // Function to update an existing todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return; // Return if the new value is empty or contains only whitespace
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    ); // Update the todos by mapping over them and replacing the todo with the matching id
  };

  // Function to remove a todo from the list
  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id); // Create a new array without the todo to be removed

    setTodos(removedArr); // Update the todos state with the new array
  };

  // Function to mark a todo as complete or incomplete
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete; // Toggle the completion status of the todo
      }
      return todo;
    });
    setTodos(updatedTodos); // Update the todos state with the modified todo list
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1> {/* Heading for the task list */}
      <TaskInput onSubmit={addTodo} />{" "}
      {/* TaskInput component for adding new todos */}
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />{" "}
      {/* Todo component to display and manage todos */}
      <p style={{ color: "white" }}>Made by Himanshu Gupta</p>{" "}
      {/* Credit for the creator */}
    </>
  );
}

export default TaskList; // Export the TaskList component
