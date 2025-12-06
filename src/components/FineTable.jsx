import React, { useState } from "react";

export default function FineTable({ students, issues, onAddFine }) {
  const [amount, setAmount] = useState({});

  function handleChange(id, value) {
    setAmount({ ...amount, [id]: value });
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Student</th>
          <th>Roll No</th>
          <th>Issued Books</th>
          <th>Add Fine (₹)</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => {
          const studentIssues = issues.filter((i) => i.studentId === s.id);

          return (
            <tr key={s.id}>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>{s.roll}</td>
              <td style={styles.td}>{studentIssues.length}</td>

              <td style={styles.td}>
                <input
                  type="number"
                  placeholder="₹"
                  style={styles.input}
                  value={amount[s.id] || ""}
                  onChange={(e) => handleChange(s.id, e.target.value)}
                />
              </td>

              <td style={styles.td}>
                <button
                  style={styles.btn}
                  onClick={() => onAddFine(s.id, Number(amount[s.id] || 0))}
                >
                  Add Fine
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
    border: "5px solid #FF4D6A",
  },

  td: {
    padding: "10px",
    border: "1px solid #FF4D6A",
    textAlign: "center",
  },

  input: {
    padding: "6px",
    width: "80px",
    borderRadius: "8px",
    border: "1px solid #FF4D6A",
  },

  btn: {
    background: "#FF4D6A",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
