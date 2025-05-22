document.querySelectorAll(".dropbtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const dropdown = this.nextElementSibling;
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", function (e) {
    if (!btn.contains(e.target) && !btn.nextElementSibling.contains(e.target)) {
      btn.nextElementSibling.style.display = "none";
    }
  });
});
