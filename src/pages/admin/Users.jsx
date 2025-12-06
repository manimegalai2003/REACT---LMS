import React, { useEffect, useState } from "react";
import UserTable from "../../components/UserTable";
import { adminPageStyles } from "../../styles/adminStyles";


export default function Users() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>All Students</h2>
      <UserTable users={students} />
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },
};
