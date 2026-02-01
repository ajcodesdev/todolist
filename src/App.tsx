import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editTask, setEditTask] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Add task
  const addTask = () => {
    if (task.trim() === '') {
      setShowModal(true)
      return
    }
    setTasks([...tasks, task])
    setTask('')
  }

  // Delete task
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  // Start editing
  const startEdit = (index: number) => {
    setEditIndex(index)
    setEditTask(tasks[index])
  }

  // Save edited task
  const saveEdit = () => {
    if (editTask.trim() === '') {
      setShowModal(true)
      return
    }

    const updatedTasks = [...tasks]
    updatedTasks[editIndex!] = editTask
    setTasks(updatedTasks)
    setEditIndex(null)
    setEditTask('')
  }

  return (
    <>
      <h2>Todo List</h2>

      <div className="input-box">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter A Task..."
        />
        <button onClick={addTask}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

<ul>
  {tasks.length > 0 ? (
    tasks.map((val, index) => (
      <li key={index}>
        {editIndex === index ? (
          <>
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <button onClick={saveEdit}>
              <i className="fa-solid fa-check"></i>
            </button>
            <button onClick={() => setEditIndex(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </>
        ) : (
          <>
            {val}
            <div className="actions">
              <button onClick={() => startEdit(index)}>
                <i className="fa-solid fa-pen"></i>
              </button>

              {/* Delete button ONLY when not editing */}
              <button onClick={() => deleteTask(index)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </>
        )}
      </li>
    ))
  ) : (
    <p className="not-task">No tasks found</p>
  )}
</ul>


      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Oops!</h3>
            <p>Please enter a task.</p>
            <button onClick={() => setShowModal(false)}>Okay</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
