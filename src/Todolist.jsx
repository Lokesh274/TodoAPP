//Took help from the below references
// took help from the slides https://uab.instructure.com/courses/1625351/files/folder/lecture/week_08?preview=75783872
//https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
import React, { useState } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedText, setEditedText] = useState({}); // State to handle editing text

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now(), isEditing: false, completed: false }]);
      setNewTask('');
    }
  };

  const handleChange = (e) => setNewTask(e.target.value);

  const handleChangeEdit = (text, id) => {
    setEditedText({ ...editedText, [id]: text });
  };

  const handleEditClick = (id, text) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isEditing: true } : task
    ));
    setEditedText({ ...editedText, [id]: text });
  };

  const handleSaveClick = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editedText[id], isEditing: false } : task
    ));
  };

  const handleCompleteClick = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteClick = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <input
        value={newTask}
        onChange={handleChange}
        placeholder="Enter the new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.isEditing ? (
              <div>
                <input
                  type="text"
                  value={editedText[task.id] || task.text}
                  onChange={(e) => handleChangeEdit(e.target.value, task.id)}
                  placeholder="Enter updated task"
                />
                <button onClick={() => handleSaveClick(task.id)}>
                  Save
                </button>
              </div>
            ) : (
              <>
                {task.text}
                <button onClick={() => handleCompleteClick(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEditClick(task.id, task.text)}>Edit</button>
                <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
