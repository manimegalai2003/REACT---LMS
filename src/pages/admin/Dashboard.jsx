import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard";
import { adminPageStyles } from "../../styles/adminStyles";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminDashboard() {
  const [books, setBooks] = useState(0);
  const [students, setStudents] = useState(0);
  const [issues, setIssues] = useState(0);

  useEffect(() => {
    setBooks((JSON.parse(localStorage.getItem("books")) || []).length);
    setStudents((JSON.parse(localStorage.getItem("students")) || []).length);
    setIssues((JSON.parse(localStorage.getItem("issues")) || []).length);
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      <div style={styles.stats}>
        <StatsCard title="Total Books" value={books} />
        <StatsCard title="Total Students" value={students} />
        <StatsCard title="Issued Books" value={issues} />
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },
  stats: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
};

