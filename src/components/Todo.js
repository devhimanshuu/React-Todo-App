import React, { useState } from "react";
import TaskInput from "./TaskInput"; // Importing the TaskInput component
import { RiCloseCircleLine } from "react-icons/ri"; // Importing the Close Circle Line icon from the react-icons library
import { TiEdit } from "react-icons/ti"; // Importing the Edit icon from the react-icons library

// Function component Todo to display the list of todos
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  // State to manage the editing of a todo item
  const [edit, setEdit] = useState({
    id: null, // id of the todo item being edited
    value: "", // text value of the todo item being edited
  });

  // Function to submit the updated todo item
  const submitUpdate = (value) => {
    updateTodo(edit.id, value); // Call the updateTodo function with the id and updated value
    setEdit({
      id: null, // Reset the id to null after update
      value: "", // Reset the value to an empty string after update
    });
  };

  // If edit.id is not null, render the TaskInput with the edit details
  if (edit.id) {
    return <TaskInput edit={edit} onSubmit={submitUpdate} />;
  }

  // If edit.id is null, map through the todos array and display each todo item
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"} // Apply different class based on todo completion status
      key={index} // Set the key to the index of the todo
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text} {/* Render the text of the todo */}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)} // Handle click event to remove the todo item
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })} // Handle click event to set the todo item for editing
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Todo; // Export the Todo component
