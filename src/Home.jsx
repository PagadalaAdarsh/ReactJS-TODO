import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    completed: [],
  }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, { text: task, category: 'todo' }], // Add to to-do
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t.text !== taskToMove.text
      );
      const updatedTarget = [
        ...prevTasks[targetCategory],
        { ...taskToMove, category: targetCategory },
      ];
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrent,
        [targetCategory]: updatedTarget,
      };
    });
  };

  // Delete a single task
  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedCategory = prevTasks[category].filter(
        (t) => t.text !== taskToDelete.text
      );
      return { ...prevTasks, [category]: updatedCategory };
    });
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks({ todo: [], ongoing: [], completed: [] });
  };

  // Clear tasks for a specific category
  const clearTasks = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [],
    }));
  };

  return (
    <div className="home">
      <div className="heading-container">
        <h1 className="main-heading">TO-DO APP</h1>
      </div>

      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>

      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>Added Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index} className={`task ${t.category}`}>
                <div className="task-text">{t.text}</div>
                <div className="task-buttons">
                  <button
                    className="move-to-ongoing-btn"
                    onClick={() => moveTask('todo', 'ongoing', t)}
                  >
                    Move to Ongoing
                  </button>
                  <button
                    className="move-to-completed-btn"
                    onClick={() => moveTask('todo', 'completed', t)}
                  >
                    Move to Completed
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask('todo', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="clear-all-button"
            onClick={() => clearTasks('todo')}
          >
            Clear All
          </button>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index} className={`task ${t.category}`}>
                <div className="task-text">{t.text}</div>
                <div className="task-buttons">
                  <button
                    className="move-to-todo-btn"
                    onClick={() => moveTask('ongoing', 'todo', t)}
                  >
                    Move to To-Do
                  </button>
                  <button
                    className="move-to-completed-btn"
                    onClick={() => moveTask('ongoing', 'completed', t)}
                  >
                    Move to Completed
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask('ongoing', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="clear-all-button"
            onClick={() => clearTasks('ongoing')}
          >
            Clear All
          </button>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index} className={`task ${t.category}`}>
                <div className="task-text">{t.text}</div>
                <div className="task-buttons">
                  <button
                    className="move-to-ongoing-btn"
                    onClick={() => moveTask('completed', 'ongoing', t)}
                  >
                    Move to Ongoing
                  </button>
                  <button
                    className="move-to-todo-btn"
                    onClick={() => moveTask('completed', 'todo', t)}
                  >
                    Move to To-Do
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask('completed', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="clear-all-button"
            onClick={() => clearTasks('completed')}
          >
            Clear All
          </button>
        </div>
      </div>

      <button className="clear-all-button" onClick={clearAllTasks}>
        Clear All Tasks
      </button>
    </div>
  );
}

export default Home;
