function checkLogin() {
    const studentCode = localStorage.getItem("studentCode");
    if (!studentCode) {
        window.location.href = "login.html";
    }
}

function loginUser(event) {
    event.preventDefault();
    const studentCode = document.getElementById("studentCode").value;
    
    if (/^SC\d{6}$/.test(studentCode)) {
        localStorage.setItem("studentCode", studentCode);
        window.location.href = "index.html";
    } else {
        alert("Invalid student code.");
    }
}

function logoutUser() {
    localStorage.removeItem("studentCode");
    window.location.href = "login.html";
}

document.getElementById("loginForm")?.addEventListener("submit", loginUser);
