
export function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

export function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

export function deleteBook(id) {
  const books = getBooks().filter((b) => b.id !== id);
  localStorage.setItem("books", JSON.stringify(books));
}

export function updateBook(id, updated) {
  const books = getBooks().map((b) => (b.id === id ? updated : b));
  localStorage.setItem("books", JSON.stringify(books));
}

export function getBook(id) {
  return getBooks().find((b) => b.id === id);
}
export function getCategories() {
  const books = getBooks();
  const categories = books
    .map((b) => b.category)
    .filter((c, index, self) => c && self.indexOf(c) === index);
  return categories;
}