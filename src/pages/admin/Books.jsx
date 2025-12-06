import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem("books")) || []);
  }, []);

  function handleEdit(id) {
    navigate(`/admin/edit/${id}`);
  }

  function handleDelete(id) {
    const updated = books.filter((b) => b.id !== id);
    localStorage.setItem("books", JSON.stringify(updated));
    setBooks(updated);
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Books</h2>

      <button style={styles.addBtn} onClick={() => navigate("/admin/add")}>
        + Add Book
      </button>

      <div style={styles.grid}>
        {books.map((b) => (
          <BookCard
            key={b.id}
            book={b}
            mode="admin" 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },

  addBtn: {
    padding: "10px 14px",
    background: "#FF4D6A",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};
