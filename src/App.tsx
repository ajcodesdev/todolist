import { useState } from 'react'
import './App.css'

interface Task {
  id: string
  text: string
  x: number
  y: number
  rotation: number
  color: string
}

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [editIndex, setEditIndex] = useState<string | null>(null)
  const [editTask, setEditTask] = useState('')
  const [showModal, setShowModal] = useState(false)

  const colors = [
    '#FFE5E5', '#E5F3FF', '#E5FFE5', '#FFF5E5', '#F5E5FF',
    '#FFE5F5', '#E5FFF5', '#F5FFE5', '#FFE5CC', '#CCE5FF'
  ]

  const getRandomPosition = () => {
    const x = Math.random() * 70 + 10 // 10% to 80% of screen width
    const y = Math.random() * 60 + 20 // 20% to 80% of screen height
    const rotation = Math.random() * 10 - 5 // -5 to 5 degrees rotation
    const color = colors[Math.floor(Math.random() * colors.length)]
    return { x, y, rotation, color }
  }

  // Add task
  const addTask = () => {
    if (task.trim() === '') {
      setShowModal(true)
      return
    }
    const newTask: Task = {
      id: Date.now().toString(),
      text: task,
      ...getRandomPosition()
    }
    setTasks([...tasks, newTask])
    setTask('')
  }

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Start editing
  const startEdit = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id)
    if (taskToEdit) {
      setEditIndex(id)
      setEditTask(taskToEdit.text)
    }
  }

  // Save edited task
  const saveEdit = () => {
    if (editTask.trim() === '') {
      setShowModal(true)
      return
    }

    const updatedTasks = tasks.map(task => 
      task.id === editIndex ? { ...task, text: editTask } : task
    )
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

      {/* Task Cards */}
      <div className="task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="task-card"
              style={{
                left: `${task.x}%`,
                top: `${task.y}%`,
                transform: `rotate(${task.rotation}deg)`,
                backgroundColor: task.color
              }}
            >
              {editIndex === task.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button onClick={saveEdit} className="save-btn">
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => setEditIndex(null)} className="cancel-btn">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-content">{task.text}</div>
                  <div className="task-actions">
                    <button onClick={() => startEdit(task.id)} className="edit-btn">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="delete-btn">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="not-task">No tasks found. Add your first task!</p>
        )}
      </div>


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
