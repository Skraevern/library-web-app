let newBook;

const myLibrary = [];
let myLibraryDisplayArr = myLibrary;
const form = document.getElementById("form");
let mainPage = document.getElementById("main");

let totalBooksText;
let totalReadBooksText;
let totalUnreadBooksText;
let bookNr;

const showBySelected = document.getElementById("show-by");
const sortBySelected = document.getElementById("sort-by");
const addBtn = document.getElementById("add-btn");
const ratingSelected = document.getElementById("rating");
const ratingText = document.getElementById("rating-text");
const addBookToLibraryBtn = document.getElementById("add-to-library-btn");
const ConfirmEditFormBtn = document.getElementById("edit-form-btn");
const cancelBtn = document.getElementById("cancel-btn");
ConfirmEditFormBtn.style.display = "none";
let testBtn = document.getElementById("test-btn");

function randomBooks() {
    let numberOfBooks = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < numberOfBooks; i++) {
        let randomTitle = Math.floor(Math.random() * 100) + 1;
        let randomAuthor = Math.floor(Math.random() * 100) + 1;
        let randomPages = Math.floor(Math.random() * 100) + 1;
        let randomRating = Math.floor(Math.random() * 10) + 1;
        newBook = new Book(randomTitle,randomAuthor,"unread",randomRating,randomPages,"","");
        myLibrary.push(newBook);
    }
}

function Book(title, author, read, rating, pages, published, description) {
    this.bookNumber = myLibrary.length + 1;
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
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
    const libraryList = document.getElementById("book-list");
    libraryList.innerHTML = "";
    myLibraryDisplayArr = [];
    showReadUnread();
    showSorted();

    for (let i = 0; i < myLibraryDisplayArr.length; i++) {
        let div = document.createElement("div");
        div.classList.add("list-card");
        div.id = `div${i}`;

        for (const key in myLibraryDisplayArr[i]) {
            const value = document.createElement("p");
            if (key === "title") {
                value.textContent = myLibraryDisplayArr[i][key];
                value.style.fontWeight = "bold";
            }
            if (key === "author") value.textContent = `By: ${myLibraryDisplayArr[i][key]}`;
            if (key === "read") myLibraryDisplayArr[i][key] === "read" ? (value.textContent = "Book read") : (value.textContent = "Book not read");
            if (key === "rating") { 
                let stars = myLibraryDisplayArr[i].rating;
                for (let i = 0; i < stars; i++) { 
                    value.textContent += "⭐️"; 
                }
            }
            if (key === "pages") value.textContent = `Number of Pages: ${myLibraryDisplayArr[i][key]}`;
            if (key === "published") value.textContent = `Published: ${myLibraryDisplayArr[i][key]}`;
            if (key === "description") value.textContent = myLibraryDisplayArr[i][key];

            div.appendChild(value);
        }
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", edit);
        div.appendChild(editBtn);
        libraryList.appendChild(div);
    }
}
function showReadUnread() {
    if (showBySelected.value === "all") myLibraryDisplayArr = myLibrary;
    if (showBySelected.value === "read") {
        for (let i = 0; i < myLibrary.length; i++) { 
            if (myLibrary[i].read === "read") myLibraryDisplayArr.push(myLibrary[i]); 
        }
    }
    if (showBySelected.value === "unread") {
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].read === "unread")
                myLibraryDisplayArr.push(myLibrary[i]);
        }
    }
}
function showSorted() {
    if (sortBySelected.value === "time-added")
        myLibraryDisplayArr.sort((a, b) => a.bookNumber > b.bookNumber ? 1 : -1
        );
    if (sortBySelected.value === "time-added-reverse")
        myLibraryDisplayArr.sort((a, b) => a.bookNumber < b.bookNumber ? 1 : -1
        );
    if (sortBySelected.value === "title-a-z") myLibraryDisplayArr.sort((a, b) => (a.title > b.title ? 1 : -1));
    if (sortBySelected.value === "title-z-a") myLibraryDisplayArr.sort((a, b) => (a.title < b.title ? 1 : -1));
    if (sortBySelected.value === "author-a-z") myLibraryDisplayArr.sort((a, b) => (a.author > b.author ? 1 : -1));
    if (sortBySelected.value === "author-z-a") myLibraryDisplayArr.sort((a, b) => (a.author < b.author ? 1 : -1));
    if (sortBySelected.value === "rating-high-low") myLibraryDisplayArr.sort((a, b) => a.rating < b.rating ? 1 : -1);
    if (sortBySelected.value === "rating-low-high") myLibraryDisplayArr.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    if (sortBySelected.value === "pages-high-low") myLibraryDisplayArr.sort((a, b) => a.pages < b.pages ? 1 : -1);
    if (sortBySelected.value === "pages-low-high") myLibraryDisplayArr.sort((a, b) => (a.pages > b.pages ? 1 : -1));
    if (sortBySelected.value === "published-new-old") myLibraryDisplayArr.sort((a, b) => a.published < b.published ? 1 : -1);
    if (sortBySelected.value === "published-old-new") myLibraryDisplayArr.sort((a, b) => a.published > b.published ? 1 : -1);
}

clearForm = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("read").value = "unread";
    document.getElementById("rating").value = 5;
    document.getElementById("pages").value = "";
    document.getElementById("published").value = "";
    document.getElementById("description").value = "";
    form.style.display = "none";
    addBookToLibraryBtn.style.display = "inline";
    ConfirmEditFormBtn.style.display = "none";
    mainPage.classList.remove("blur");
};

function displayLibraryOverview() {
    const libraryOverview = document.getElementById("library-overview");
    totalBooksText = document.createElement("p");
    totalReadBooksText = document.createElement("p");
    totalUnreadBooksText = document.createElement("p");
    updateLibraryOverview();
    libraryOverview.appendChild(totalBooksText);
    libraryOverview.appendChild(totalReadBooksText);
    libraryOverview.appendChild(totalUnreadBooksText);
}
function updateLibraryOverview() {
    let totalBooks = myLibrary.length;
    let totalReadBooks = 0;
    let totalUnreadBooks = 0;

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === "read") totalReadBooks++;
        if (myLibrary[i].read === "unread") totalUnreadBooks++;
    }
    totalBooksText.textContent = `Number of Books: ${totalBooks}`;
    totalReadBooksText.textContent = `Read Books: ${totalReadBooks}`;
    totalUnreadBooksText.textContent = `Unread Books: ${totalUnreadBooks}`;
}

function edit() {
    const divId = this.parentNode.id;
    bookNr = divId.replace(/^\D+/g, ""); //Removes all letters from string. Only numbers left.
    form.style.display = "block";
    mainPage.classList.add("blur");
    ConfirmEditFormBtn.style.display = "inline";
    addBookToLibraryBtn.style.display = "none";
    // Show stored values.
    document.getElementById("title").value = myLibrary[bookNr].title;
    document.getElementById("author").value = myLibrary[bookNr].author;
    document.getElementById("read").value = myLibrary[bookNr].read;
    document.getElementById("rating").value = myLibrary[bookNr].rating;
    ratingText.textContent = myLibrary[bookNr].rating;
    document.getElementById("pages").value = myLibrary[bookNr].pages;
    document.getElementById("published").value = myLibrary[bookNr].published;
    document.getElementById("description").value = myLibrary[bookNr].description;
}

addBtn.onclick = function () {
    form.style.display = "block";
    mainPage.classList.add("blur");
    ratingText.textContent = ratingSelected.value;
};
addBookToLibraryBtn.onclick = function () {
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    if (title.value === "") document.getElementById("title-label").classList.add("wrong-input");
    if (author.value === "") document.getElementById("author-label").classList.add("wrong-input");
    if (title.value !== "" && author.value !== "") {
        newBook = new Book(
            document.getElementById("title").value,
            document.getElementById("author").value,
            document.getElementById("read").value,
            document.getElementById("rating").value,
            document.getElementById("pages").value,
            document.getElementById("published").value,
            document.getElementById("description").value
        );
        addBookToLibrary();
        clearForm();
    }
};

ConfirmEditFormBtn.onclick = function () {
    myLibrary[bookNr].title = document.getElementById("title").value;
    myLibrary[bookNr].author = document.getElementById("author").value;
    myLibrary[bookNr].read = document.getElementById("read").value;
    myLibrary[bookNr].rating = document.getElementById("rating").value;
    myLibrary[bookNr].pages = document.getElementById("pages").value;
    myLibrary[bookNr].published = document.getElementById("published").value;
    myLibrary[bookNr].description = document.getElementById("description").value;
    clearForm();
    displayLibraryCards();
    updateLibraryOverview();
};

cancelBtn.onclick = function () {
    clearForm();
};
testBtn.onclick = function () {
    console.log(myLibrary);
    console.log(myLibrary[0].read);
    console.log(myLibrary[1].read);
};
showBySelected.onchange = function () {
    displayLibraryCards();
};
sortBySelected.onchange = function () {
    displayLibraryCards();
};
ratingSelected.onchange = function () {
    ratingText.textContent = ratingSelected.value;
};
randomBooks();
displayLibraryCards();
displayLibraryOverview();
