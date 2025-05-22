document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const recipeId = this.dataset.id;

    fetch(`/toggle_favorite/${recipeId}`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "added") {
          this.textContent = "❤️";
        } else {
          this.textContent = "🤍";
        }
      });
  });
});
