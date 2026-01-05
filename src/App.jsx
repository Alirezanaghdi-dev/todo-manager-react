
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todolist, setTodoList] = useState(() => {
    const saved = localStorage.getItem('todolist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }, [todolist]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    
    const task = {
      id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList([...todolist, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTodoList(todolist.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(todolist.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    }));
  };

  const totalTasks = todolist.length;
  const completedTasks = todolist.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Todo List App</h1>
          <div className='addTask'>
            <input 
              value={newTask} 
              onChange={handleChange}
              placeholder="Enter a new task..."
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="stats">
          <div className="stat-item">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>
          <div className="stat-item">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="stat-item">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>
        </div>

        <div className="list-container">
          <h2>Your Tasks</h2>
          <div className='list'>
            {todolist.length === 0 ? (
              <p>No tasks yet. Add one above!</p>
            ) : (
              todolist.map((task) => (
                <div 
                  key={task.id} 
                  className={`taskItem ${task.completed ? 'completed' : ''}`}
                >
                  <div className="taskContent">
                    <h3>{task.taskName}</h3>
                  </div>
                  <div className="buttons">
                    <button onClick={() => completeTask(task.id)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;