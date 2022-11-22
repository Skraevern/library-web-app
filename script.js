
let bookTitle;
let bookAuthor;
let bookPages;
let bookRead;
let bookPublished;
let bookDescription;
let book;
let addBtn = document.getElementById("add-btn");
let myLibrary = [];

function Book(title, author, pages, read, published, description) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.published = published;
    this.description = description;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

function addBookToLibrary() {
    
}

addBtn.onclick = function() {
    bookTitle = document.getElementById("title").value;
    bookAuthor = document.getElementById("author").value;
    bookPages = document.getElementById("pages").value;
    bookRead = document.getElementById("read").value;
    bookPublished = document.getElementById("published").value;
    bookDescription = document.getElementById("description").value;
    book = new Book(bookTitle, bookAuthor, bookPages, bookRead, bookPublished, bookDescription )
    console.log(book);
}

//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
