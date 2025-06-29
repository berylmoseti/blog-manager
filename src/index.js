const BASE_URL = "http://localhost:3000";

function displayPosts() {
  fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(posts => {
      const postsUl = document.getElementById("posts-ul");
      postsUl.innerHTML = ""; // clear old list

      posts.forEach(post => {
  const li = document.createElement("li");

  const title = document.createElement("p");
  title.textContent = post.title;

  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;
    img.style.width = "100%";
    img.style.maxWidth = "150px";
    li.appendChild(img);
  }

  li.appendChild(title);
  li.style.cursor = "pointer";
  li.addEventListener("click", () => handlePostClick(post.id));

  postsUl.appendChild(li);
});

    })
    .catch(error => console.error("Error fetching posts:", error));
}

document.addEventListener("DOMContentLoaded", main);

function main() {
  displayPosts();
  addNewPostListener();
  addEditPostListener();
  // later: addNewPostListener();
}
function handlePostClick(postId) {
  fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
      // Update the detail section
      document.getElementById("detail-title").textContent = post.title;
      document.getElementById("detail-content").textContent = post.content;
      document.getElementById("detail-author").textContent = post.author;

      const detailImage = document.getElementById("detail-image");
      if (post.image) {
        detailImage.src = post.image;
        detailImage.style.display = "block";
      } else {
        detailImage.style.display = "none";
      }

      // Set current post id for edit / delete
      document.getElementById("post-detail").dataset.currentPostId = post.id;

      // Edit button
      const editBtn = document.getElementById("edit-btn");
      editBtn.style.display = "inline-block";
      editBtn.onclick = () => {
        const editForm = document.getElementById("edit-post-form");
        editForm.classList.remove("hidden");
        editForm["title"].value = post.title;
        editForm["content"].value = post.content;
      };

      // Delete button
      const deleteBtn = document.getElementById("delete-btn");
      deleteBtn.style.display = "inline-block";
      deleteBtn.onclick = () => {
        deletePost(post.id);
      };
    })
    .catch(error => console.error("Error fetching post details:", error));
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newPost = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value,
      image: form.image.value
    };

    // POST to server
    fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(postFromServer => {
        // Now it has an ID from the server, so add click handler
        addPostToList(postFromServer);
      })
      .catch(error => console.error("Error adding new post:", error));

    // Clear the form
    form.reset();
  });
}

function addPostToList(post) {
  const postsUl = document.getElementById("posts-ul");
  const li = document.createElement("li");

  const title = document.createElement("p");
  title.textContent = post.title;

  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;
    img.style.width = "100%";
    img.style.maxWidth = "150px";
    li.appendChild(img);
  }

  li.appendChild(title);
  li.style.cursor = "pointer";

  if (post.id) {
    li.addEventListener("click", () => handlePostClick(post.id));
  }

  postsUl.appendChild(li);
}
function addEditPostListener() {
  const editForm = document.getElementById("edit-post-form");
  const cancelBtn = document.getElementById("cancel-edit");

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const postId = document.getElementById("post-detail").dataset.currentPostId;
    const updatedPost = {
      title: editForm["title"].value,
      content: editForm["content"].value
    };

    fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedPost)
    })
      .then(response => response.json())
      .then(updated => {
        // Update the detail view
        document.getElementById("detail-title").textContent = updated.title;
        document.getElementById("detail-content").textContent = updated.content;

        // Rerun displayPosts to update list
        displayPosts();

        // Hide the edit form
        editForm.classList.add("hidden");
      })
      .catch(error => console.error("Error updating post:", error));
  });

  // Handle cancel
  cancelBtn.addEventListener("click", () => {
    editForm.classList.add("hidden");
  });
}

function deletePost(postId) {
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE"
  })
    .then(() => {
      // Refresh the list
      displayPosts();
      // Clear the details view
      clearPostDetail();
    })
    .catch(error => console.error("Error deleting post:", error));
}

function clearPostDetail() {
  document.getElementById("detail-title").textContent = "";
  document.getElementById("detail-content").textContent = "";
  document.getElementById("detail-author").textContent = "";
  const detailImage = document.getElementById("detail-image");
  detailImage.src = "";
  detailImage.style.display = "none";

  document.getElementById("edit-btn").style.display = "none";
  document.getElementById("delete-btn").style.display = "none";
}

