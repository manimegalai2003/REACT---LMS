import React from "react";

export default function IssueTable({ issues, onReturn }) {
  if (!issues.length) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>No issues yet.</p>
    );
  }

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const students = JSON.parse(localStorage.getItem("students")) || [];

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Student Name</th>
          <th style={styles.th}>Roll No</th>
          <th style={styles.th}>Book Title</th>
          <th style={styles.th}>Issued Date</th>
          <th style={styles.th}>Due Date</th> 
          <th style={styles.th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {issues.map((i) => {
          const student = students.find((s) => s.id === i.studentId);
          const book = books.find((b) => b.id === i.bookId);

          return (
            <tr key={i.id}>
              <td style={styles.td}>{student?.name || "Unknown"}</td>
              <td style={styles.td}>{student?.roll || "N/A"}</td>
              <td style={styles.td}>{book?.title || "Deleted Book"}</td>

             
              <td style={styles.td}>
                {i.issuedAt ? new Date(i.issuedAt).toLocaleString() : i.date}
              </td>

              
              <td style={styles.td}>
                {i.issuedAt
                  ? new Date(
                      new Date(i.issuedAt).getTime() + 7 * 24 * 60 * 60 * 1000
                    ).toLocaleString()
                  : "N/A"}
              </td>

              <td style={styles.td}>
                <button style={styles.btn} onClick={() => onReturn(i.id)}>
                  Return
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const styles = {
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
  btn: {
    background: "#FF4D6A",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
