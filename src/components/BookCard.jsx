import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, mode, onIssue, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
    
      <img
        src={book.cover || "https://via.placeholder.com/200x250?text=No+Image"}
        alt={book.title}
        style={styles.img}
      />

      <h3 style={styles.title}>{book.title}</h3>

   
      <p style={styles.author}><span style={{color:"black", fontWeight:"bold"}}>Author:</span> {book.author}</p>
<br />
      <div style={styles.btnRow}>
        {mode === "student" && (
          <>
            <button
              style={styles.viewBtn}
              onClick={() => navigate(`/student/book/${book.id}`)}
            >
              View Details
            </button>
            <button style={styles.issueBtn} onClick={() => onIssue(book.id)}>
              Issue
            </button>
          </>
        )}

        {mode === "admin" && (
          <>
            <button style={styles.viewBtn} onClick={() => onEdit(book.id)}>
              Edit
            </button>
            <button style={styles.issueBtn} onClick={() => onDelete(book.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "250px",
    minHeight: "360px",
    padding: "14px",
    background: "#FFE6F2",
    border: "2px solid #FF4D6A",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(255, 77, 106, 0.3)",
  },

  img: {
    width: "150px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #FF4D6A",
  },

  title: {
    marginTop: "10px",
    fontSize: "17px",
    fontWeight: "700",
    color: "#5A001F",
  },

  author: {
    fontSize: "14px",
    color: "#5A001F",
    marginBottom: "10px",
  },

  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },

  viewBtn: {
    flex: 1,
    marginRight: "5px",
    padding: "8px",
    background: "white",
    border: "2px solid #FF4D6A",
    borderRadius: "8px",
    color: "#FF4D6A",
    cursor: "pointer",
    fontWeight: "600",
  },

  issueBtn: {
    flex: 1,
    marginLeft: "5px",
    padding: "8px",
    background: "#FF4D6A",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};
