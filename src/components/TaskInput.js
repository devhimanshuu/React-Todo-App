import React, { useState, useEffect, useRef } from "react";

// Function component TaskInput for displaying and managing input for todos
function TaskInput(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : ""); // State to manage the input value

  const inputRef = useRef(null); // Ref to focus on the input field

  // useEffect to focus on the input field when component mounts
  useEffect(() => {
    inputRef.current.focus(); // Focus on the input field
  });

  // Function to handle changes in the input value
  const handleChange = (e) => {
    setInput(e.target.value); // Update the input value
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    props.onSubmit({
      id: Math.floor(Math.random() * 10000), // Generate a random id for the new todo
      text: input, // Set the text of the new todo to the input value
    });
    setInput(""); // Reset the input value after submission
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TaskInput; // Export the TaskInput component
