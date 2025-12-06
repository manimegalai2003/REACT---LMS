import React, { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";

export default function Browse() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(stored);
  }, []);

  function issueBook(id) {
    const student = JSON.parse(localStorage.getItem("currentStudent"));
    const issues = JSON.parse(localStorage.getItem("issues")) || [];

    issues.push({
      id: Date.now(),
      bookId: id,
      studentId: student.id,
      date: new Date().toISOString().split("T")[0],
    });

    localStorage.setItem("issues", JSON.stringify(issues));
    alert("Book Issued!");
  }

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Browse Books</h2>

      <input
        style={styles.search}
        type="text"
        placeholder="Search books..."
        onChange={(e) => setSearch(e.target.value)}
      />
<br /><br /><br />
      <div style={styles.grid}>
        {filtered.map((b) => (
          <BookCard
            key={b.id}
            book={b}
            mode="student" 
            onIssue={() => issueBook(b.id)} 
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },
  search: {
    width: "280px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #FF4D6A",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#FF4D6A",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
};
