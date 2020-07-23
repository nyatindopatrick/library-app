function Book() {
  this.title = document.querySelector('#booktitle').value;
  this.author = document.querySelector('#author').value;
  this.read = false;
}

// event listener for new book button
const btn = document.querySelector('#newbook');
btn.addEventListener('click', displayForm());

// execute submit event
const bookForm = document.querySelector('#bookform');
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book();
  addBook(book);
  displayForm();
  show();
});

// load books list when page loads
window.onload = show();
