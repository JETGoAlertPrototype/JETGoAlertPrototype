// settings.js - Handles Dark Mode & Language Support
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

document.getElementById("darkModeToggle")?.addEventListener("click", toggleDarkMode);
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
