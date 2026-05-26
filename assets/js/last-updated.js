(function () {
  const target = document.getElementById("last-updated");
  if (!target) return;

  const owner = "zyl199710";
  const repo = "zyl199710.github.io";

  let pagePath = window.location.pathname.split("/").pop();

  if (!pagePath || pagePath === "") {
    pagePath = "index.html";
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?path=${pagePath}&per_page=1`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        target.textContent = "recently";
        return;
      }

      const date = new Date(data[0].commit.committer.date);

      target.textContent = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    })
    .catch(() => {
      target.textContent = "recently";
    });
})();