
export function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

export function addStudent(student) {
  const students = getStudents();
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}
export function getStudentById(id) {
  const students = getStudents();
  return students.find((s) => s.id === id);
}