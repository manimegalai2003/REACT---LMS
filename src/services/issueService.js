
export function getIssues() {
  return JSON.parse(localStorage.getItem("issues")) || [];
}

export function issueBook(studentId, bookId) {
  const issues = getIssues();

  issues.push({
    id: Date.now(),
    studentId,
    bookId,
    date: new Date().toISOString().split("T")[0],
  });

  localStorage.setItem("issues", JSON.stringify(issues));
}

export function returnBook(issueId) {
  const issues = getIssues().filter((i) => i.id !== issueId);
  localStorage.setItem("issues", JSON.stringify(issues));
}

export function getStudentIssuedBooks(studentId) {
  return getIssues().filter((i) => i.studentId === studentId);
}
export function getBookIssues(bookId) {
  return getIssues().filter((i) => i.bookId === bookId);
}