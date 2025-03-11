/* 🔑 USER AUTHENTICATION SYSTEM */ 
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("studentCode")) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
});

/* 📌 Mobile Menu Toggle */
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

/* 🚪 LOGOUT FUNCTION */
document.getElementById("logoutButton")?.addEventListener("click", () => {
    localStorage.removeItem("studentCode");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", function () {
    fetchPHIVOLCSEarthquakeData();
    fetchEarthquakeData();
});
