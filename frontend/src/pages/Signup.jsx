// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Quick validation
//     if (!formData.name || !formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     console.log("Submitting Signup Data:", formData);

//     // TODO: Connect with src/api/api.js in the next step!
//     // For now, simulate a successful signup and navigate to login
//     alert("Signup form submitted! Check browser console.");
//     navigate("/login");
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <h2>Create an Account</h2>

//         {error && <p style={styles.error}>{error}</p>}

//         <div style={styles.inputGroup}>
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button type="submit" style={styles.button}>
//           Sign Up
//         </button>

//         <p style={styles.footerText}>
//           Already have an account? <Link to="/login">Log in here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// // Basic inline styling for quick rendering
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
//   },
//   footerText: {
//     marginTop: "1rem",
//     fontSize: "0.9rem",
//   },
// };

// export default Signup;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api"; // 1. Imported Axios API instance

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    // Quick client-side check
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // 2. Map form fields to backend payload schema (Username, Setpassword)
      const payload = {
        Username: formData.name,
        email: formData.email,
        Setpassword: formData.password,
      };

      // Real Axios API request
      await API.post("/users/signUp", payload);

      // Navigate to login after successful creation
      navigate("/login");
    } catch (err) {
      // Display backend error message if available
      setError(
        err.response?.data?.message ||
          "Failed to create an account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

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
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login">Log in here</Link>
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

export default Signup;
