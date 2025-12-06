import React, { useEffect, useState } from "react";

export default function MyIssues() {
  const [myIssues, setMyIssues] = useState([]);
  const student = JSON.parse(localStorage.getItem("currentStudent"));

useEffect(() => {
  const allIssues = JSON.parse(localStorage.getItem("issues")) || [];
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const updated = allIssues.map((i) => {
    const book = books.find((b) => b.id === i.bookId);
    return {
      ...i,
      bookTitle: i.bookTitle || book?.title || "Unknown Book",
    };
  });

  localStorage.setItem("issues", JSON.stringify(updated));

  const filtered = updated.filter((i) => i.studentId === student.id);
  setMyIssues(filtered);
}, []);


  function getDueDate(issuedAt) {
    const due = new Date(
      new Date(issuedAt).getTime() + 7 * 24 * 60 * 60 * 1000
    );
    return due.toLocaleString();
  }

  function getRemainingDays(issuedAt) {
    const due = new Date(
      new Date(issuedAt).getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const now = new Date();
    const diff = due - now;
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    return days >= 0 ? days + " days left" : "Overdue";
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Issued Books</h2>

      {myIssues.length === 0 ? (
        <p>No issued books.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Book</th>
              <th style={styles.th}>Issued At</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {myIssues.map((i) => (
              <tr key={i.id}>
                <td style={styles.td}>{i.bookTitle}</td>

                <td style={styles.td}>
                  {new Date(i.issuedAt).toLocaleString()}
                </td>

                <td style={styles.td}>{getDueDate(i.issuedAt)}</td>

                <td style={styles.td}>{getRemainingDays(i.issuedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F", marginBottom: "10px" },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },

  th: {
    background: "#FFE6F2",
    padding: "10px",
    border: "2px solid #FF4D6A",
  },

  td: {
    padding: "10px",
    border: "1px solid #FF4D6A",
    textAlign: "center",
  },
};
