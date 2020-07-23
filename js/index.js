// get values from the form

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
const removeBook = (bk) => {
  const books = getBooks();
  books.splice(bk, 1);
  save(books);
};

// change a book to read
const read = (idx) => {
  const books = getBooks();
  if (books[idx]) books[idx].read = true;
  save(books);
};
