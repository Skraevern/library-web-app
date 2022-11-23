let newBook;
let addBtn = document.getElementById("add-btn");
let myLibrary = [];
let libraryList = document.getElementById("book-list");

function Book(title, author, pages, published, read, description) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.read = read;
    this.description = description;
}

function addBookToLibrary() {
    myLibrary.push(newBook);
    displayLibraryCard();
}

function displayLibraryCard() {
    let div = document.createElement("div");
    div.classList.add("list-card"); 


    for (const key in newBook) {
        let text = document.createElement("p");
        
        switch (key) {
            case "title":
                text.textContent = newBook[key];
                text.style.fontWeight = 'bold';
                break;
            case "author":
                text.textContent = `By: ${newBook[key]}`;
                break;
            case "pages":
                text.textContent = `Number of pages: ${newBook[key]}`;
                break;
            case "published":
                text.textContent = `Released: ${newBook[key]}`
                break;
            case "read":
                text.textContent = newBook[key];
                break;
            case "description":
                text.textContent = newBook[key];
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
        document.getElementById("published").value,
        document.getElementById("read").value, 
        document.getElementById("description").value 
        )
    addBookToLibrary();
}


//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
