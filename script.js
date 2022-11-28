let newBook;

let myLibrary = [];
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

let addBtn = document.getElementById("add-btn");
let addBookToLibraryBtn = document.getElementById("add-to-library-btn");
let editFormBtn = document.getElementById("edit-form-btn");
let cancelBtn = document.getElementById("cancel-btn");
editFormBtn.style.display = "none";

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
    let div = document.createElement("div");
    div.classList.add("list-card");
    div.id = `div${myLibrary.length - 1}`;
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
                document.getElementById("pages").value === ""
                    ? (value.textContent = "Number of pages: ---")
                    : (value.textContent = `Number of pages: ${newBook[key]}`);
                break;
            case "published":
                document.getElementById("published").value === ""
                    ? (value.textContent = "Published: ---")
                    : (value.textContent = `Published: ${newBook[key]}`);
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
                value.textContent = newBook[key];
        }
        div.appendChild(value);
    }
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", edit);
    div.appendChild(editBtn);
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
    addBookToLibraryBtn.style.display = "inline";
    editFormBtn.style.display = "none";
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
    let divId = this.parentNode.id;
    let bookNr = divId.replace(/^\D+/g, ""); //Removes all letters from string. Only numbers left.
    form.style.display = "block";
    mainPage.classList.add("blur");
    editFormBtn.style.display = "inline";
    addBookToLibraryBtn.style.display = "none";

    // document.getElementById("title").value,
    // document.getElementById("author").value,
    // document.getElementById("pages").value,
    // document.getElementById("published").value,
    // document.getElementById("read").value,
    // document.getElementById("description").value
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

cancelBtn.onclick = function () {
    clearForm();
};

displayLibraryOverview();
//const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");

//console.log(book1.info());
