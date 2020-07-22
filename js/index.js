// get values from the form
function Book() {
  this.title = document.querySelector('#title').value;
  this.author = document.querySelector('#author').value;
  this.read = false;
}

// event listener for new book button
let btn = document.querySelector('#newbook');
btn.addEventListener('click', displayForm());

// execute submit event
const bookForm = document.querySelector('#bookform');
bookform.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book();
  addBook(book);
  displayForm();
  show();
});

// load books list when page loads
window.onload = show();
