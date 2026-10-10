// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     // Quick client-side validation
//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     console.log("Submitting Login Data:", formData);

//     // Simulated login success
//     alert("Login form submitted! Check browser console.");
//     navigate("/dashboard");
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <h2>Welcome Back</h2>

//         {error && <p style={styles.error}>{error}</p>}

//         <div style={styles.inputGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button type="submit" style={styles.button}>
//           Log In
//         </button>

//         <p style={styles.footerText}>
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// // Styling matches your Signup component
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "80vh",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     width: "320px",
//     padding: "2rem",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "1rem",
//     textAlign: "left",
//   },
//   button: {
//     padding: "0.75rem",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginTop: "0.5rem",
//   },
//   error: {
//     color: "red",
//     fontSize: "0.9rem",
//     marginBottom: "1rem",
//   },
//   footerText: {
//     marginTop: "1rem",
//     fontSize: "0.9rem",
//   },
// };

// export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api"; // 1. Import API instance

const Login = ({ setToken }) => {
  // 2. Accept setToken prop
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // 3. Make real POST request to /login
      const res = await API.post("/login", formData);

      // 4. Extract token, update App state, and navigate to tasks
      const token = res.data.token;
      setToken(token);

      navigate("/tasks");
    } catch (err) {
      // Display backend error message if available
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    textAlign: "left",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  footerText: {
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
};

export default Login;
