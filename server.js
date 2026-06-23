import express from "express";
import pg from "pg";

const app = express();

app.use(express.static("public"));
app.use(express.json());
// app.use(express.urlencoded())


const db = new pg.Client({
    user: "postgres",
    database: "Books",
    password: "1234",
    host: "localhost",
    port: "5433"
});
db.connect();

app.get("/api/books", async (req, res) => {
    try {
        const sortBy = req.query.sort || "rating";
        let queryText = "select * from books ";
        if (sortBy === "rating") {
            queryText += "order by rating desc";
        } else if (sortBy === "dateread") {
            queryText += "order by dateread desc";
        } else if (sortBy === "title") {
            queryText += "order by title asc";
        }

        const result = await db.query(queryText);
        const data = result.rows;
        res.json(data);

    } catch (err) {
        console.log(err);
        res.json({ err: "bhai kuch gadbad hai" });
    }
});

app.post("/api/books", async (req, res) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
        const rating = req.body.rating;
        const dateread = req.body.dateread;
        const isbn = req.body.isbn;
        const notes = req.body.notes;

        await db.query("insert into books(title,author,rating,dateread,isbn,notes) values($1,$2,$3,$4,$5,$6)", [title, author, rating, dateread, isbn, notes]);
        res.json({ success: true, message: "Book added successfully!" });
    } catch (err) {
        res.json({ error: err, message: "book can't be added!" });
    }
});

app.delete("/api/books/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("Delete from books where id=$1", [id]);
        res.json({ success: true, message: "The books has been deleted!" });
    } catch (err) {
        res.json({ error: err, message: "Problem while deleting" });
    }
});

app.put("/api/books/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, rating, dateread, isbn, notes } = req.body;
        await db.query("update books set title=$1, author=$2, rating=$3, dateread=$4, isbn=$5, notes=$6 where id=$7", [title, author, rating, dateread, isbn, notes, id]);

        res.json({ success: true, message: "Book updated successfully!" });
    } catch (err) {
        res.json({ error: err, message: "Error while updating book" });
    }
});


app.listen(3000, () => {
    console.log("server is runnig at port 3000");
})