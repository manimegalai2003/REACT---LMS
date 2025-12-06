import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import {
  FaBook,
  FaUser,
  FaCommentDots,
  FaQuestionCircle,
} from "react-icons/fa";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [myBooksCount, setMyBooksCount] = useState(0);
  const [fineCount, setFineCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedStudent = JSON.parse(localStorage.getItem("currentStudent"));
    const issues = JSON.parse(localStorage.getItem("issues")) || [];
    const fines = JSON.parse(localStorage.getItem("fines")) || [];

    setStudent(loggedStudent);

    const issued = issues.filter((i) => i.studentId === loggedStudent.id);
    setMyBooksCount(issued.length);

    const myFines = fines.filter(
      (f) => f.studentId === loggedStudent.id && !f.paid
    );
    setFineCount(myFines.length);
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>
        Welcome, <span style={{ color: "#FF4D6A" }}>{student?.name}</span>..!
      </h2>

      <div style={styles.stats}>
        <StatsCard
          title="Browse Books"
          value={<FaBook size={30} color="#FF4D6A" />}
          clickable
          onClick={() => navigate("/student/browse")}
        />


        <StatsCard
          title="Give Feedback"
          value={<FaCommentDots size={30} color="#FF4D6A" />}
          clickable
          onClick={() => navigate("/student/feedback")}
        />

        <StatsCard
          title="Help & Support"
          value={<FaQuestionCircle size={30} color="#FF4D6A" />}
          clickable
          onClick={() => navigate("/student/help")}
        />
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: {
    color: "#5A001F",
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },
};
