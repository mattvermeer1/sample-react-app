import React, { useState } from 'react';
import './App.css';

function App() {
  const [lists, setLists] = useState([{ id: 1, name: 'Default List', tasks: [] }]);
  const [activeList, setActiveList] = useState(1);

  const addList = () => {
    const name = prompt('List name:');
    if (name) {
      setLists([...lists, { id: Date.now(), name, tasks: [] }]);
    }
  };

  const addTask = () => {
    const text = prompt('Task:');
    if (text) {
      setLists(lists.map(list => 
        list.id === activeList 
          ? { ...list, tasks: [...list.tasks, { 
              id: Date.now(), 
              text, 
              priority: 'medium', 
              dueDate: '', 
              completed: false 
            }]}
          : list
      ));
    }
  };

  const updateTask = (taskId, updates) => {
    setLists(lists.map(list => 
      list.id === activeList 
        ? { ...list, tasks: list.tasks.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
          )}
        : list
    ));
  };

  const deleteTask = (taskId) => {
    setLists(lists.map(list => 
      list.id === activeList 
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    ));
  };

  const currentList = lists.find(list => list.id === activeList);

  return (
    <div className="app">
      <div className="sidebar">
        <h3>Lists</h3>
        {lists.map(list => (
          <div 
            key={list.id} 
            className={`list-item ${list.id === activeList ? 'active' : ''}`}
            onClick={() => setActiveList(list.id)}
          >
            {list.name}
          </div>
        ))}
        <button onClick={addList}>+ Add List</button>
      </div>
      
      <div className="main">
        <h2>{currentList?.name}</h2>
        <button onClick={addTask}>+ Add Task</button>
        
        <div className="tasks">
          {currentList?.tasks.map(task => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
              />
              <span>{task.text}</span>
              
              <select 
                value={task.priority} 
                onChange={(e) => updateTask(task.id, { priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              
              <input 
                type="date" 
                value={task.dueDate}
                onChange={(e) => updateTask(task.id, { dueDate: e.target.value })}
              />
              
              <button onClick={() => deleteTask(task.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
