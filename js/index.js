const btn = document.querySelector('#newbook');
const bookForm = document.querySelector('#bookform');

function Book() {
  this.title = document.querySelector('#booktitle').value;
  this.author = document.querySelector('#author').value;
  this.read = false;
}

// get books from localstorage
const getBooks = () => {
  const lib = localStorage.getItem('library');
  return lib ? JSON.parse(lib) : [];
};

// loop list of books
const render = (books) => {
  let booksList = '';
  books.forEach((book, i) => {
    const { title, author, read } = book;
    booksList += `
      <tr onClick={read(${i})} class=" ${read ? 'read' : ''}">
        <th scope="row">${i + 1}</th>
        <td>${title}</td>
        <td>by <i>${author}</i></td>
        <td> ${read}</td>
        <td ><span onClick="removeBook(${i})" class="del py-2 px-3">Delete</span></td>
      </tr>
      `;
  });
  return booksList;
};

// render the books list
const show = () => {
  document.getElementById('bookslist').innerHTML = render(getBooks());
};

const save = (book) => {
  localStorage.setItem('library', JSON.stringify(book));
  show();
};

// add a book to library array
const addBook = (book) => {
  const { title, author } = book;
  const books = getBooks();
  const dup = books.filter(
    // eslint-disable-next-line comma-dangle
    (item) => item.title === title && item.author === author
  );
  if (dup.length === 0 && title.length > 0) {
    books.push({ title, author });
  }
  return save(books);
};

const displayForm = () => {
  const bkform = document.querySelector('#bookform');
  btn.addEventListener('click', () => {
    if (bkform.classList.contains('hidden')) {
      bkform.classList.remove('hidden');
      bkform.classList.add('show');
    } else {
      bkform.classList.add('hidden');
    }
  });
};

// delete a book
// eslint-disable-next-line no-unused-vars
const removeBook = (bk) => {
  const books = getBooks();
  books.splice(bk, 1);
  save(books);
};

// change a book to read
// eslint-disable-next-line no-unused-vars
const read = (idx) => {
  const books = getBooks();
  if (books[idx]) books[idx].read = true;
  save(books);
};

// event listener for new book button
btn.addEventListener('click', displayForm());

// execute submit event
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book();
  addBook(book);
  bookForm.reset();
  displayForm();
  show();
});

// load books list when page loads
window.onload = show();
