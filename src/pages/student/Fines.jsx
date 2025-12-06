import React, { useEffect, useState } from "react";
import UPIPaymentModal from "../../components/UPIPaymentModal";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

export default function Fines() {
  const [fines, setFines] = useState([]);
  const [student, setStudent] = useState(null);
  const [payingFine, setPayingFine] = useState(null);

  useEffect(() => {
    const loggedStudent = JSON.parse(localStorage.getItem("currentStudent"));
    const allFines = JSON.parse(localStorage.getItem("fines")) || [];

    setStudent(loggedStudent);

    const myFines = allFines.filter((f) => f.studentId === loggedStudent.id);
    setFines(myFines);
  }, []);


  function confirmPayment() {
    const allFines = JSON.parse(localStorage.getItem("fines")) || [];

    const updatedFines = allFines.map((f) =>
      f.id === payingFine.id ? { ...f, paid: true } : f
    );

    localStorage.setItem("fines", JSON.stringify(updatedFines));

    setFines(updatedFines.filter((f) => f.studentId === student.id));

    alert("Payment Successful! Fine marked as PAID.");

    setPayingFine(null);
  }


  return (
    <div style={styles.page}>
      <h2 style={styles.title}>
        My Fines <RiMoneyRupeeCircleLine size={30} color="#FF4D6A" />
      </h2>

      {payingFine && (
        <UPIPaymentModal
          fine={payingFine}
          onClose={() => setPayingFine(null)}
          onConfirm={confirmPayment}
        />
      )}

      {fines.length === 0 ? (
        <p style={styles.noFine}>No fines assigned!</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fines.map((f) => (
              <tr key={f.id}>
                <td style={styles.td}>₹{f.amount}</td>
                <td style={styles.td}>{f.date}</td>

                <td style={styles.td}>
                  {f.paid ? (
                    <span style={styles.paidBadge}>Paid</span>
                  ) : (
                    <span style={styles.notPaid}>Not Paid</span>
                  )}
                </td>

                <td style={styles.td}>
                  {!f.paid ? (
                    <button
                      style={styles.payBtn}
                      onClick={() => setPayingFine(f)}
                    >
                      Pay Now
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "20px" },
  title: { color: "#5A001F" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  td: { padding: "17px", border: "3px solid #FF4D6A", textAlign: "center" },
  payBtn: {
    padding: "8px 12px",
    background: "#FF4D6A",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  paidBadge: {
    padding: "6px 12px",
    background: "#A7FFB5",
    borderRadius: "8px",
    fontWeight: "600",
    border: "1px solid green",
  },
  notPaid: {
    padding: "6px 12px",
    background: "#FFD6D6",
    borderRadius: "8px",
    fontWeight: "600",
    border: "1px solid #FF4D6A",
  },

  qrImage: {
    width: "160px",
    height: "160px",
    borderRadius: "10px",
    border: "2px solid #FF4D6A",
    marginTop: "10px",
  },

  noFine: { color: "#5A001F", marginTop: "20px" },
};
