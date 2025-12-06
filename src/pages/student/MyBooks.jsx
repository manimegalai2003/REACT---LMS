import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("currentStudent"));
    const issues = JSON.parse(localStorage.getItem("issues")) || [];
    const allBooks = JSON.parse(localStorage.getItem("books")) || [];

    const issuedBooks = issues
      .filter((i) => i.studentId === student.id)
      .map((i) => allBooks.find((b) => b.id === i.bookId));

    setMyBooks(issuedBooks);
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Books</h2>

      <div style={styles.grid}>
        {myBooks.length === 0 && <p>No books issued yet.</p>}

        {myBooks.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};
