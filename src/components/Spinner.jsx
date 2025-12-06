import React from "react";

export default function Spinner() {
  return (
    <div style={styles.container}>
      <img src="/loading.gif" alt="Loading..." style={styles.gif} />
      <p style={styles.text}>Loading…</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  gif: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
  },
  text: {
    color: "#5A001F",
    marginTop: "10px",
    fontWeight: "600",
  },
};
