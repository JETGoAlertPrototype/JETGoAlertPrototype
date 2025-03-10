// auth.js - Handles Student Login System
function checkLogin() {
    const studentCode = localStorage.getItem("studentCode");
    if (!studentCode) {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", checkLogin);

function loginUser(event) {
    event.preventDefault();
    const studentCode = document.getElementById("studentCode").value;
    if (/^SC\d{6}$/.test(studentCode)) {
        localStorage.setItem("studentCode", studentCode);
        window.location.href = "index.html";
    } else {
        alert("Invalid student code. Please enter a valid school-issued student code.");
    }
}

document.getElementById("loginForm")?.addEventListener("submit", loginUser);

function logoutUser() {
    localStorage.removeItem("studentCode");
    window.location.href = "login.html";
}

document.getElementById("logoutButton")?.addEventListener("click", logoutUser);
