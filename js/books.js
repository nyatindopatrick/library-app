// get books from localstorage
const getBooks = () => {
  let lib = localStorage.getItem('library');
  return lib ? JSON.parse(lib) : [];
};

const save = (book) => localStorage.setItem('library', JSON.stringify(book));

// add a book to library array
const addBook = (book) => {
  const { title, author } = book;
  let books = getBooks();
  let dup = books.filter(
    (item) => item.title == title && item.author == author
  );
  if (dup.length == 0 && title.length > 0) {
    books.push({ title, author });
  }
  return save(books);
};

// loop list of books
const render = (books) => {
  let booksList = '';
  books.forEach((book, i) => {
    const { title, author, read } = book;
    booksList += `
      <div onClick={read(${i})} class="item ${read ? 'read' : ''}">
        <img
          src="https://www.pngkit.com/png/detail/61-612708_open-book-vector-clipart-silhouette-symbol-icon-design.png"
          alt=""
        />
        <h4>${title}</h4>
        <p>by <i>${author}</i></p>
        <button onClick="removeBook(${i})">Delete</button>
      </div>
      `;
  });
  return booksList;
};

// render the books list
const show = () =>
  (document.getElementById('bookslist').innerHTML = render(getBooks()));

//   show or hide form
const displayForm = () => {
  let bkform = document.querySelector('#bookform');
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
const removeBook = (bk) => {
  let books = getBooks();
  books.splice(bk, 1);
  save(books);
  show();
};

// change a book to read
const read = (idx) => {
  let books = getBooks();
  if (books[idx]) books[idx].read = true;
  save(books);
  show();
};
