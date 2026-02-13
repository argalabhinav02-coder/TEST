function openSidebar() {
  document.getElementById("sidebar").style.left = "0";
}

function closeSidebar() {
  document.getElementById("sidebar").style.left = "-260px";
}

function showCategory(cat) {
  document.querySelectorAll(".card").forEach(c => {
    c.style.display = c.classList.contains(cat) ? "block" : "none";
  });
  closeSidebar();
}
