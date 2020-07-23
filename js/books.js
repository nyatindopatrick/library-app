// get books from localstorage
const getBooks = () => {
  let lib = localStorage.getItem("library");
  return lib ? JSON.parse(lib) : [];
};

const save = (book) => {
  localStorage.setItem("library", JSON.stringify(book));
  show();
};

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
  let booksList = "";
  books.forEach((book, i) => {
    const { title, author, read } = book;
    booksList += `
      <tr onClick={read(${i})} class=" ${read ? "read" : ""}">
        <th scope="row">${i + 1}</th>
        <td>${title}</td>
        <td>by <i>${author}</i></td>
        <td> ${read}</td>
        <td onClick="removeBook(${i})">Delete</td>
      </tr>
      `;
  });
  return booksList;
};

// render the books list
const show = () =>
  (document.getElementById("bookslist").innerHTML = render(getBooks()));

//   show or hide form
const displayForm = () => {
  let bkform = document.querySelector("#bookform");
  btn.addEventListener("click", () => {
    if (bkform.classList.contains("hidden")) {
      bkform.classList.remove("hidden");
      bkform.classList.add("show");
    } else {
      bkform.classList.add("hidden");
    }
  });
};

// delete a book
const removeBook = (bk) => {
  let books = getBooks();
  books.splice(bk, 1);
  save(books);
};

// change a book to read
const read = (idx) => {
  let books = getBooks();
  if (books[idx]) books[idx].read = true;
  save(books);
};
