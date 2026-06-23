
let editingBookId = null;

async function fetchBooks(sortBy = "rating") {
    try {
        const result = await fetch(`/api/books?sort=${sortBy}`);
        const books = await result.json();

        const container = document.getElementById("booksContainer");
        container.innerHTML = "";

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("bookCard");
            // bookCard.classList.add("container");

            bookCard.innerHTML = `
            <img src="https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg" alt="" srcset="">
            <div class="text">
        <h2>${book.title}</h2>
            <p><strong>By: </strong>${book.author}</p>
            <p><strong>Rating: </strong>${book.rating}/5</p>
            <p><strong>Date Read: </strong>${new Date(book.dateread).toLocaleDateString()}</p>
            <p><strong>Notes: </strong>${book.notes}</p>
    </div>
            <button class="editBtn" data-id="${book.id}">Edit</button>
            <button class="deleteBtn" data-id="${book.id}">Delete</button>
            `;
            container.appendChild(bookCard);
        });
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

fetchBooks();


const form = document.getElementById("bookForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = Object.fromEntries(formData.entries());
    console.log(bookData);

    if (editingBookId == null) {
        const result = await fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData)
        });
        const resData = await result.json();
        if (resData.success) {
            form.reset();
            fetchBooks();
        }
    } else {
        const result = await fetch(`/api/books/${editingBookId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData)
        });
        const resData = await result.json();
        if (resData.success) {
            form.reset();
            editingBookId = null;
            form.querySelector("button").innerText = "Add Book";
            fetchBooks();
        }
    }
});

const container = document.getElementById("booksContainer");
container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const id = e.target.getAttribute("data-id");
        const result = await fetch(`/api/books/${id}`, {
            method: "DELETE"
        });
        const resData = await result.json();
        if (resData.success) {
            fetchBooks();
        }
    }
    else if (e.target.classList.contains("editBtn")) {
        const id = e.target.getAttribute("data-id");
        editingBookId = id;

        const card = e.target.closest(".bookCard");
        const title = card.querySelector("h2").innerText;

        const para = card.querySelectorAll("p");
        const author = para[0].innerText.replace("By: ", "");
        const rating = para[1].innerText.replace("Rating: ", "").split("/")[0];

        const rawDate = para[2].innerText.replace("Date Read: ", "");
        const formattedDate = new Date(rawDate).toISOString().split("T")[0];

        const notes = para[3].innerText.replace("Notes: ", "");
        const imgSrc = card.querySelector("img").src;
        const isbn = imgSrc.substring(imgSrc.lastIndexOf("/") + 1, imgSrc.lastIndexOf("-"));

        document.querySelector('input[name="title"]').value = title;
        document.querySelector('input[name="author"]').value = author;
        document.querySelector('input[name="rating"]').value = rating;
        document.querySelector('input[name="dateread"]').value = formattedDate;
        document.querySelector('input[name="notes"]').value = notes;
        document.querySelector('input[name="isbn"]').value = isbn;
        document.getElementById("bookForm").querySelector("button").innerText = "Update Book";
    }
});

const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
        fetchBooks(e.target.value);
    });
}