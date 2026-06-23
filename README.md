# 📚 Book Notes

A simple web app to track books you've read — add books, write personal notes, rate them, and sort your collection by rating, date read, or title.

🔗 **Live Demo:** [book-notes-b3xr.onrender.com](https://book-notes-b3xr.onrender.com/)

---

## ✨ Features

- 📖 Add books with title, author, rating, date read, and personal notes
- 🔃 Sort your book list by:
  - ⭐ Rating (High to Low)
  - 📅 Date Read (Recent First)
  - 🔤 Title (A to Z)
- 🗑️ Delete books from your collection
- 🌐 Fetches book cover images via the Open Library API

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Backend    | Node.js, Express.js     |
| Frontend   | HTML                    |
| Database   | PostgreSQL              |
| Styling    | CSS                     |
| Deployment | Render                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/Piiush04/Book-Notes.git
cd Book-Notes

# Install dependencies
npm install
```

### Database Setup

Create a PostgreSQL database and run the following to set up the table:

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  rating INTEGER,
  date_read DATE,
  notes TEXT,
  cover_url TEXT
);
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```

### Run the App

```bash
node index.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
Book-Notes/
├── public/          # Static assets (CSS, images)
├── views/           # EJS templates
├── index.js         # Main server file
├── package.json
└── .env             # Environment variables (not committed)
```

---

## 🙋‍♂️ Author

**Piyush** — [GitHub @Piiush04](https://github.com/Piiush04)
