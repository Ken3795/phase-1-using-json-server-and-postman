const apiUrl = "http://localhost:3000/articles";

// Fetch and display articles
function fetchArticles() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((articles) => {
      const articlesList = document.getElementById("articles-list");
      articlesList.innerHTML = ""; // Clear the list
      articles.forEach((article) => {
        const li = document.createElement("li");
        li.textContent = `${article.title}: ${article.content}`;
        articlesList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching articles:", error));
}

// Add a new article
document.getElementById("add-article-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const newArticle = { title, content };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newArticle),
  })
    .then(() => {
      fetchArticles(); // Refresh the list
      e.target.reset(); // Clear the form
    })
    .catch((error) => console.error("Error adding article:", error));
});

// Initial fetch
fetchArticles();
