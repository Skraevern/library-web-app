let newBook;

let myLibrary = [];
let displayMyLibraryArr = myLibrary;
let libraryList = document.getElementById("book-list");
let libraryOverview = document.getElementById("library-overview");
let form = document.getElementById("form");

let mainPage = document.getElementById("main");
let totalBooks = myLibrary.length;
let totalReadBooks;
let totalUnreadBooks;
let totalBooksText;
let totalReadBooksText;
let totalUnreadBooksText;
let inputElems = document.getElementsByTagName("input");
let formReadCheckbox = document.getElementById("read");
let divId;
let bookNr;
let showBy = document.getElementById("show-by");
let sortBy = document.getElementById("sort-by");

let addBtn = document.getElementById("add-btn");
let addBookToLibraryBtn = document.getElementById("add-to-library-btn");
let ConfirmEditFormBtn = document.getElementById("edit-form-btn");
let cancelBtn = document.getElementById("cancel-btn");
ConfirmEditFormBtn.style.display = "none";
let testBtn = document.getElementById("test-btn");

function Book(title, author, read, pages, published, description) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
    this.published = published;
    this.description = description;
}

function addBookToLibrary() {
    myLibrary.push(newBook);
    displayLibraryCards();
    updateLibraryOverview();
}

function displayLibraryCards() {
    libraryList.innerHTML = "";
    console.log(showBy.value);
    switch (showBy.value) {
        case "all":
            displayMyLibraryArr = myLibrary;
            break;
        case "read":
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].read === "read") {
                    displayMyLibraryArr.push(myLibrary[i]);
                }
            }
            break;
        case "unread":
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].read === "unread") {
                    displayMyLibraryArr.push(myLibrary[i]);
                }
            }
    }
    console.log(displayMyLibraryArr);
    for (let i = 0; i < displayMyLibraryArr.length; i++) {
        let div = document.createElement("div");
        div.classList.add("list-card");
        div.id = `div${i}`;

        for (const key in displayMyLibraryArr[i]) {
            let value = document.createElement("p");
            switch (key) {
                case "title":
                    value.textContent = displayMyLibraryArr[i][key];
                    value.style.fontWeight = "bold";
                    break;
                case "author":
                    value.textContent = `By: ${displayMyLibraryArr[i][key]}`;
                    break;
                case "read":
                    displayMyLibraryArr[i][key] === "read"
                        ? (value.textContent = "Book read")
                        : (value.textContent = "Book not read");
                    break;
                case "pages":
                    value.textContent = `Number of Pages: ${displayMyLibraryArr[i][key]}`;
                    break;
                case "published":
                    value.textContent = `Published: ${displayMyLibraryArr[i][key]}`;
                    break;

                case "description":
                    value.textContent = displayMyLibraryArr[i][key];
            }
            div.appendChild(value);
        }
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", edit);
        div.appendChild(editBtn);
        libraryList.appendChild(div);
    }
}

clearForm = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("read").value = "unread";
    document.getElementById("pages").value = "";
    document.getElementById("published").value = "";
    document.getElementById("description").value = "";
    form.style.display = "none";
    addBookToLibraryBtn.style.display = "inline";
    ConfirmEditFormBtn.style.display = "none";
    mainPage.classList.remove("blur");
};

function displayLibraryOverview() {
    totalBooksText = document.createElement("p");
    totalReadBooksText = document.createElement("p");
    totalUnreadBooksText = document.createElement("p");
    updateLibraryOverview();
    libraryOverview.appendChild(totalBooksText);
    libraryOverview.appendChild(totalReadBooksText);
    libraryOverview.appendChild(totalUnreadBooksText);
}
function updateLibraryOverview() {
    totalBooks = myLibrary.length;
    totalReadBooks = 0;
    totalUnreadBooks = 0;

    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i].read);
        if (myLibrary[i].read === "read") {
            totalReadBooks++;
        }
        if (myLibrary[i].read === "unread") {
            totalUnreadBooks++;
        }
    }
    totalBooksText.textContent = `Number of Books: ${totalBooks}`;
    totalReadBooksText.textContent = `Read Books: ${totalReadBooks}`;
    totalUnreadBooksText.textContent = `Unread Books: ${totalUnreadBooks}`;
}

function edit() {
    divId = this.parentNode.id;
    bookNr = divId.replace(/^\D+/g, ""); //Removes all letters from string. Only numbers left.
    form.style.display = "block";
    mainPage.classList.add("blur");
    ConfirmEditFormBtn.style.display = "inline";
    addBookToLibraryBtn.style.display = "none";
    // Show stored values.
    document.getElementById("title").value = myLibrary[bookNr].title;
    document.getElementById("author").value = myLibrary[bookNr].author;
    document.getElementById("read").value = myLibrary[bookNr].read;
    document.getElementById("pages").value = myLibrary[bookNr].pages;
    document.getElementById("published").value = myLibrary[bookNr].published;
    document.getElementById("description").value =
        myLibrary[bookNr].description;
}

addBtn.onclick = function () {
    form.style.display = "block";
    mainPage.classList.add("blur");
};
addBookToLibraryBtn.onclick = function () {
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    if (title.value === "") {
        document.getElementById("title-label").classList.add("wrong-input");
    }
    if (author.value === "") {
        document.getElementById("author-label").classList.add("wrong-input");
    }
    if (title.value !== "" && author.value !== "") {
        newBook = new Book(
            document.getElementById("title").value,
            document.getElementById("author").value,
            document.getElementById("read").value,
            document.getElementById("pages").value,
            document.getElementById("published").value,
            document.getElementById("description").value
        );
        addBookToLibrary();
        clearForm();
    }
};

ConfirmEditFormBtn.onclick = function () {
    console.log(myLibrary[bookNr]);
    myLibrary[bookNr].title = document.getElementById("title").value;
    myLibrary[bookNr].author = document.getElementById("author").value;
    myLibrary[bookNr].read = document.getElementById("read").value;
    myLibrary[bookNr].pages = document.getElementById("pages").value;
    myLibrary[bookNr].published = document.getElementById("published").value;
    myLibrary[bookNr].description =
        document.getElementById("description").value;
    console.log(myLibrary[bookNr]);
    clearForm();
    displayLibraryCards();
    updateLibraryOverview();
};

cancelBtn.onclick = function () {
    clearForm();
};
testBtn.onclick = function () {
    console.log(showBy.value);
    console.log(myLibrary[0].read);
    console.log(myLibrary[1].read);
};
showBy.onchange = function () {
    displayLibraryCards();
};
sortBy.onchange = function () {};
displayLibraryOverview();
//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
