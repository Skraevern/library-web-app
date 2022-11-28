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

let addBtn = document.getElementById("add-btn");
let addBookToLibraryBtn = document.getElementById("add-to-library-btn");
let ConfirmEditFormBtn = document.getElementById("edit-form-btn");
let cancelBtn = document.getElementById("cancel-btn");
ConfirmEditFormBtn.style.display = "none";

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
    totalBooks = myLibrary.length;
    displayLibraryCard();
    updateLibraryOverview();
}

function displayLibraryCard() {
    libraryList.innerHTML = "";
    displayMyLibraryArr = myLibrary;
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
                case "pages":
                    document.getElementById("pages").value === ""
                        ? (value.textContent = "Number of pages: ---")
                        : (value.textContent = `Number of pages: ${displayMyLibraryArr[i][key]}`);
                    break;
                case "published":
                    document.getElementById("published").value === ""
                        ? (value.textContent = "Published: ---")
                        : (value.textContent = `Published: ${displayMyLibraryArr[i][key]}`);
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
                    input.name = "checkbox";
                    console.log(this.read.value)
                    formReadCheckbox.checked === true
                        ? (input.checked = true)
                        : (input.checked = false);
    
                    input.addEventListener("change", updateLibraryOverview);
                    value.appendChild(input);
    
                    let span = document.createElement("span");
                    span.classList.add("slider", "round");
                    value.appendChild(span);
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
    document.getElementById("pages").value = "";
    document.getElementById("published").value = "";
    document.getElementById("read").value = "off";
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
    checkboxes();
    totalBooksText.textContent = `Number of Books: ${totalBooks}`;
    totalReadBooksText.textContent = `Read Books: ${totalReadBooks}`;
    totalUnreadBooksText.textContent = `Unread Books: ${totalUnreadBooks}`;
}
function checkboxes() {
    // Counts checkbox statuses.
    inputElems = document.getElementsByTagName("input");
    totalReadBooks = 0;
    totalUnreadBooks = -1; //Because hidden checkbox is still counted.
    for (let i = 0; i < inputElems.length; i++) {
        if (
            inputElems[i].type === "checkbox" &&
            inputElems[i].checked === true
        ) {
            totalReadBooks++;
        } else if (
            inputElems[i].type === "checkbox" &&
            inputElems[i].checked === false
        ) {
            totalUnreadBooks++;
        }
    }
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
    document.getElementById("pages").value = myLibrary[bookNr].pages;
    document.getElementById("published").value = myLibrary[bookNr].published;
    document.getElementById("read").value = myLibrary[bookNr].read;
    document.getElementById("description").value = myLibrary[bookNr].description;
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
            document.getElementById("pages").value,
            document.getElementById("published").value,
            document.getElementById("read").value,
            document.getElementById("description").value
        );
        addBookToLibrary();
        clearForm();
    }
};

ConfirmEditFormBtn.onclick = function() {
    console.log(myLibrary[bookNr]);
    myLibrary[bookNr].title = document.getElementById("title").value;
    myLibrary[bookNr].author = document.getElementById("author").value;
    myLibrary[bookNr].pages = document.getElementById("pages").value;
    myLibrary[bookNr].published = document.getElementById("published").value;
    myLibrary[bookNr].read = document.getElementById("read").value;
    myLibrary[bookNr].description = document.getElementById("description").value;
    console.log(myLibrary[bookNr]);
    clearForm();
    displayLibraryCard();
}

cancelBtn.onclick = function () {
    clearForm();
};

displayLibraryOverview();
//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
