let newBook;
let addBtn = document.getElementById("add-btn");
let addBookToLibraryBtn = document.getElementById("add-to-library-btn");
let myLibrary = [];
let libraryList = document.getElementById("book-list");
let form = document.getElementById("form");
let cancelBtn = document.getElementById("cancel-btn");
let mainPage = document.getElementById("main");

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
        let value = document.createElement("p");

        switch (key) {
            case "title":
                value.textContent = newBook[key];
                value.style.fontWeight = "bold";
                break;
            case "author":
                value.textContent = `By: ${newBook[key]}`;
                break;
            case "pages":
                value.textContent = `Number of pages: ${newBook[key]}`;
                break;
            case "published":
                value.textContent = `Released: ${newBook[key]}`;
                break;
            case "read":
                let labelOverSwitch = document.createElement("p");
                labelOverSwitch.classList.add("label");
                labelOverSwitch.textContent = "Read:";
                div.appendChild(labelOverSwitch);

                value = document.createElement("label");
                value.classList.add("switch");

                let input = document.createElement("input");
                input.type = "checkbox";
                value.appendChild(input);

                let span = document.createElement("span");
                span.classList.add("slider", "round");
                value.appendChild(span);
                break;
            case "description":
                value.textContent = newBook[key];
        }
        div.appendChild(value);
    }
    libraryList.appendChild(div);
}

clearForm = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("published").value = "";
    document.getElementById("read").value = "";
    document.getElementById("description").value = "";
    form.style.display = "none";
    mainPage.classList.remove("blur");
};

addBtn.onclick = function () {
    form.style.display = "block";
    mainPage.classList.add("blur");
};
addBookToLibraryBtn.onclick = function () {
    newBook = new Book(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("pages").value,
        document.getElementById("published").value,
        document.getElementById("read").value,
        document.getElementById("description").value
    );
    addBookToLibrary();
    clearForm();
};
cancelBtn.onclick = function () {
    clearForm();
};
//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
