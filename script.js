let newBook;
let addBtn = document.getElementById("add-btn");
let myLibrary = [];
let libraryList = document.getElementById("book-list");

function Book(title, author, pages, read, published, description) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.published = published;
    this.description = description;
}

function addBookToLibrary() {
    myLibrary.push(newBook);

    let div = document.createElement("div");
    div.classList.add("list-card"); 


    for (const key in newBook) {
        let text = document.createElement("p");
        text.textContent = newBook[key];
        if(key === "title") {
            text.style.fontWeight = 'bold';
            
        }
        div.appendChild(text);
    }
    libraryList.appendChild(div);
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
