let newBook;
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
    myLibrary.push(newBook);
    console.log(myLibrary);
}

addBtn.onclick = function() {
    newBook = new Book(
        document.getElementById("title").value, 
        document.getElementById("author").value,
        document.getElementById("pages").value, 
        document.getElementById("read").value, 
        document.getElementById("published").value, 
        document.getElementById("description").value 
        )
    addBookToLibrary();
}

//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
