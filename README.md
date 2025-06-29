#  Blog Manager

A simple blog manager using **HTML, CSS, JavaScript** and **JSON Server**.  
It lets you view, add, edit, and delete blog posts via a local REST API.

---

##  How to run

1. **Install JSON Server**  
npm install -g json-server@0.17.4


2. **Start the API server:**
json-server db.json

3. **Open the frontend:**
Use Live Server in VS Code or open `index.html` directly in your browser.

---

## Features

- View all blog posts  
- Click a post to see full details  
- Add new posts via a form  
- Edit existing posts (title & content)  
- Delete posts  

---

## 🔗 API Endpoints

| Method | Endpoint    | Description           |
|--------|-------------|-----------------------|
| GET    | /posts      | Get all blog posts    |
| GET    | /posts/:id  | Get a single post     |
| POST   | /posts      | Create a new post     |
| PATCH  | /posts/:id  | Update a post         |
| DELETE | /posts/:id  | Delete a post         |

---

✅ That’s all — ready to build, test, and expand your project!


Author,
Beryl Nyambeki.
