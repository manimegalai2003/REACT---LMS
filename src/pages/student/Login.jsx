import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function StudentLogin() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { setStudent, setAdminLogged } = useContext(AuthContext);

  function handleLogin(e) {
    e.preventDefault();

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const found = students.find(
      (s) => s.roll === roll && s.password === password
    );

    if (!found) {
      alert("Invalid roll number or password!");
      return;
    }

    localStorage.removeItem("adminLogged");
    setAdminLogged(false);

    localStorage.setItem("currentStudent", JSON.stringify(found));
    setStudent(found); 

    navigate("/student/dashboard");
  }

  return (
    <div style={styles.page}>
    <div style={styles.box}>
      <h2 style={styles.title}>Student Login</h2>

      <form style={styles.form} onSubmit={handleLogin}>
        <input
          style={styles.input}
          type="text"
          placeholder="Roll Number"
          onChange={(e) => setRoll(e.target.value)}
        />

        <div style={styles.passwordRow}>
          <input
            style={{ ...styles.input, flex: 1 }}
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            style={styles.eyeBtn}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <button style={styles.btn}>Login</button>
      </form>
<br />
      <p style={styles.text}>
        New Student?{" "}
        <Link to="/student/signup" style={styles.link}>
          Create Account
        </Link>
      </p>
    </div>
    </div>
  );
}

const styles = {
  box: {
    width: "500px",
    minHeight: "300px",
    margin: "40px auto",
    padding: "24px",
    background: "#FFE6F2",
    border: "2px solid #FF4D6A",
    borderRadius: "12px",
    textAlign: "center",
  },
  title: { color: "#5A001F", marginBottom: "10px" },

  form: { display: "flex", flexDirection: "column", gap: "30px" },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #FF4D6A", 
  },

  passwordRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  eyeBtn: {
    padding: "10px",
    border: "1px solid #FF4D6A",
    background: "white",
    color: "#FF4D6A",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  btn: {
    padding: "10px",
    background: "#FF4D6A",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGxpYnJhcnklMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  text: {
    marginTop: "14px",
    color: "#5A001F",
  },

  link: {
    color: "#FF4D6A",
    fontWeight: "600",
    textDecoration: "none",
  },
};
