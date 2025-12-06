import React from "react";

export default function UserTable({ users }) {
  const fines = JSON.parse(localStorage.getItem("fines")) || [];

  
  function getFineStatus(studentId) {
    const studentFine = fines.filter((f) => f.studentId === studentId);

    if (studentFine.length === 0) return "No Fine";

    const unpaid = studentFine.some(
      (f) => f.paid === false || f.paid === undefined
    );

    return unpaid ? "Not Paid" : "Paid";
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Roll No</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Department</th>
          <th style={styles.th}>Fine Status</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td style={styles.td}>{u.name}</td>
            <td style={styles.td}>{u.roll}</td>
            <td style={styles.td}>{u.email}</td>
            <td style={styles.td}>{u.department}</td>

            <td style={styles.td}>
              <span
                style={{
                  ...styles.badge,
                  background:
                    getFineStatus(u.id) === "Paid" ? "#A7FFB5" : "#FFB3C6",
                  borderColor:
                    getFineStatus(u.id) === "Paid" ? "green" : "#FF4D6A",
                  color: getFineStatus(u.id) === "Paid" ? "green" : "#5A001F",
                }}
              >
                {getFineStatus(u.id)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "2px solid #FF4D6A",
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

  badge: {
    padding: "6px 12px",
    borderRadius: "10px",
    fontWeight: "600",
    border: "2px solid",
  },
};
