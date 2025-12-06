import React, { useEffect, useState } from "react";
import FineTable from "../../components/FineTable";

export default function Fines() {
  const [students, setStudents] = useState([]);
  const [issues, setIssues] = useState([]);
  const [fines, setFines] = useState([]);

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setIssues(JSON.parse(localStorage.getItem("issues")) || []);
    setFines(JSON.parse(localStorage.getItem("fines")) || []);
  }, []);

  function addFine(studentId, amount) {
    if (amount <= 0) return alert("Enter a valid fine amount!");

    const newFine = {
      id: Date.now(),
      studentId,
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [...fines, newFine];
    setFines(updated);
    localStorage.setItem("fines", JSON.stringify(updated));

    alert("Fine added successfully!");
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Manage Student Fines</h2>

      <FineTable students={students} issues={issues} onAddFine={addFine} />
    </div>
  );
}

function payFine(id) {
  const allFines = JSON.parse(localStorage.getItem("fines")) || [];

  const updated = allFines.map((f) => (f.id === id ? { ...f, paid: true } : f));

  localStorage.setItem("fines", JSON.stringify(updated));

  setFines(updated.filter((f) => f.studentId === student.id));

  alert("Payment Successful! Fine marked as Paid.");
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },
};
    