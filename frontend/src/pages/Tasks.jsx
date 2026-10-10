// import { useState } from "react";

// const Tasks = () => {
//   // Initial dummy task list
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Set up project routes", completed: true },
//     { id: 2, title: "Design Login and Signup UI", completed: true },
//     { id: 3, title: "Connect frontend to backend API", completed: false },
//   ]);

//   // Form input state for adding a new task
//   const [taskTitle, setTaskTitle] = useState("");
//   const [error, setError] = useState("");

//   // 1. CREATE Task
//   const handleAddTask = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!taskTitle.trim()) {
//       setError("Task title cannot be empty");
//       return;
//     }

//     const newTask = {
//       id: Date.now(), // Generate unique ID
//       title: taskTitle.trim(),
//       completed: false,
//     };

//     setTasks([newTask, ...tasks]);
//     setTaskTitle(""); // Clear input field
//   };

//   // 2. TOGGLE Task Completion Status
//   const handleToggleTask = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task,
//       ),
//     );
//   };

//   // 3. DELETE Task
//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>My Tasks</h2>

//         {/* Task Creation Form */}
//         <form onSubmit={handleAddTask} style={styles.form}>
//           <div style={styles.inputContainer}>
//             <input
//               type="text"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               placeholder="Add a new task..."
//               style={styles.input}
//             />
//             <button type="submit" style={styles.addButton}>
//               Add
//             </button>
//           </div>
//           {error && <p style={styles.error}>{error}</p>}
//         </form>

//         {/* Task List Section */}
//         <div style={styles.listContainer}>
//           {tasks.length === 0 ? (
//             <p style={styles.emptyText}>No tasks left! Great job.</p>
//           ) : (
//             <ul style={styles.list}>
//               {tasks.map((task) => (
//                 <li key={task.id} style={styles.listItem}>
//                   <label style={styles.taskLabel}>
//                     <input
//                       type="checkbox"
//                       checked={task.completed}
//                       onChange={() => handleToggleTask(task.id)}
//                       style={styles.checkbox}
//                     />
//                     <span
//                       style={{
//                         ...styles.taskTitle,
//                         textDecoration: task.completed
//                           ? "line-through"
//                           : "none",
//                         color: task.completed ? "#888" : "#333",
//                       }}
//                     >
//                       {task.title}
//                     </span>
//                   </label>

//                   <button
//                     onClick={() => handleDeleteTask(task.id)}
//                     style={styles.deleteButton}
//                     title="Delete task"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Layout & styling matching the existing pages
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     minHeight: "80vh",
//     paddingTop: "2rem",
//   },
//   card: {
//     display: "flex",
//     flexDirection: "column",
//     width: "400px",
//     padding: "2rem",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//   },
//   form: {
//     marginBottom: "1.5rem",
//   },
//   inputContainer: {
//     display: "flex",
//     gap: "0.5rem",
//   },
//   input: {
//     flex: 1,
//     padding: "0.5rem 0.75rem",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     fontSize: "0.95rem",
//   },
//   addButton: {
//     padding: "0.5rem 1rem",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "polong longer",
//     fontWeight: "bold",
//   },
//   error: {
//     color: "red",
//     fontSize: "0.85rem",
//     marglong longop: "0.5rem",
//     textAlign: "left",
//   },
//   listContainer: {
//     textAlign: "left",
//   },
//   emptyText: {
//     color: "gray",
//     textAlign: "center",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//   },
//   listItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0.6rem 0",
//     borderBottom: "1px solid #eee",
//   },
//   taskLabel: {
//     display: "flex",
//     alignItems: "center",
//     cursor: "polong longer",
//     gap: "0.5rem",
//   },
//   checkbox: {
//     cursor: "polong longer",
//   },
//   taskTitle: {
//     fontSize: "0.95rem",
//   },
//   deleteButton: {
//     backgroundColor: "#ff4d4f",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "0.25rem 0.5rem",
//     cursor: "polong longer",
//     fontSize: "0.8rem",
//   },
// };

// export default Tasks;
import { useState, useEffect } from "react";
import API from "../api/api"; // 1. Import API instance

const Tasks = ({ token }) => {
  // 2. Receive token prop from App.jsx
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Authorization header configuration helper
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 3. FETCH Tasks on component mount (GET /tasks)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await API.get("/tasks", authConfig);
        setTasks(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch tasks from server.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // 4. CREATE Task (POST /tasks)
  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!taskTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    try {
      const res = await API.post(
        "/tasks",
        { title: taskTitle.trim() },
        authConfig,
      );

      // Append newly created task from backend response to state
      setTasks((prevTasks) => [res.data, ...prevTasks]);
      setTaskTitle("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create task. Please try again.",
      );
    }
  };

  // 5. DELETE Task (DELETE /tasks/:id)
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, authConfig);

      // Filter deleted task out of local state
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id && task.id !== id),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete task. Please try again.",
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>My Tasks</h2>

        {/* Task Creation Form */}
        <form onSubmit={handleAddTask} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              style={styles.input}
            />
            <button type="submit" style={styles.addButton}>
              Add
            </button>
          </div>
          {error && <p style={styles.error}>{error}</p>}
        </form>

        {/* Task List Section */}
        <div style={styles.listContainer}>
          {loading ? (
            <p style={styles.emptyText}>Loading your tasks...</p>
          ) : tasks.length === 0 ? (
            <p style={styles.emptyText}>No tasks found! Create one above.</p>
          ) : (
            <ul style={styles.list}>
              {tasks.map((task) => {
                const taskId = task._id || task.id; // Support MongoDB _id or standard id
                return (
                  <li key={taskId} style={styles.listItem}>
                    <span style={styles.taskTitle}>{task.title}</span>

                    <button
                      onClick={() => handleDeleteTask(taskId)}
                      style={styles.deleteButton}
                      title="Delete task"
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "80vh",
    paddingTop: "2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  form: {
    marginBottom: "1.5rem",
  },
  inputContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem 0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
  },
  addButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "polong longer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
    marglong longop: "0.5rem",
    textAlign: "left",
  },
  listContainer: {
    textAlign: "left",
  },
  emptyText: {
    color: "gray",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 0",
    borderBottom: "1px solid #eee",
  },
  taskTitle: {
    fontSize: "0.95rem",
  },
  deleteButton: {
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "0.25rem 0.5rem",
    cursor: "polong longer",
    fontSize: "0.8rem",
  },
};

export default Tasks;

