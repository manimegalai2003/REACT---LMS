import React, { useEffect, useState } from "react";
import IssueTable from "../../components/IssuseTable";
import { adminPageStyles } from "../../styles/adminStyles";
export default function Issues() {
  const [issues, setIssues] = useState([]);
 useEffect(() => {
   const saved = JSON.parse(localStorage.getItem("issues")) || [];

   const updated = saved.map((i) => ({
     ...i,
     issuedAt: i.issuedAt || new Date().toISOString(),
   }));

   localStorage.setItem("issues", JSON.stringify(updated));
   setIssues(updated);
 }, []);

  function returnBook(id) {
    const updated = issues.filter((i) => i.id !== id);
    localStorage.setItem("issues", JSON.stringify(updated));
    setIssues(updated);
  }
  return (
    <div style={styles.page}>
      {" "}
      <h2 style={styles.title}>Issued Books</h2>{" "}
      <IssueTable issues={issues} onReturn={returnBook} />{" "}
    </div>
  );
}
const styles = { page: { padding: "20px" }, title: { color: "#5A001F" } };