let library = [{ title: 'Deep Dive Node', author: 'Me', read: false }];

function Book() {
  this.title = document.querySelector('#title').value;
  this.author = document.querySelector('#author').value;
  this.read = false;
}

function addBook(book) {
  const { title, author } = book;
  library.push({ title, author });
}

let bookForm = document.querySelector('#bookform');
bookform.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book();
  addBook(book);
  displayForm('hide');
  show();
});

function render(books) {
  return books.map((book, i) => {
    const { title, author, read } = book;

    return `<div onClick={read(${i})} class=${read ? 'read' : ''}>
            ${title} ${author}
            <button onClick="removeBook(${i})" >Remove</button>
            </div>
            `;
  });
}

function show() {
  document.getElementById('bookslist').innerHTML = render(library);
}

function displayForm(hidden = null) {
  let bkform = document.querySelector('#bookform');
  btn.addEventListener('click', () => {
    if (bkform.classList.contains('hidden')) {
      bkform.classList.remove('hidden');
    } else {
      bkform.classList.add('hidden');
    }
  });
}

function removeBook(bk) {
  console.log(bk);
  library.splice(bk, 1);
  show();
}

function read(idx) {
  if (library[idx]) library[idx].read = true;
  show();
}

let btn = document.querySelector('#newbook');
btn.addEventListener('click', displayForm());
window.onload = show();
