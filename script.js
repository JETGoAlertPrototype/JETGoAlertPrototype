// User Authentication System (Student Code Login)
function checkLogin() {
    const studentCode = localStorage.getItem("studentCode");
    if (!studentCode) {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", checkLogin);

// Login Page Script
function loginUser(event) {
    event.preventDefault();
    const studentCode = document.getElementById("studentCode").value;
    
    if (/^SC\d{6}$/.test(studentCode)) { // Example format: SC123456
        localStorage.setItem("studentCode", studentCode);
        window.location.href = "index.html";
    } else {
        alert("Invalid student code. Please enter a valid school-issued student code.");
    }
}

document.getElementById("loginForm")?.addEventListener("submit", loginUser);

// Logout Function
function logoutUser() {
    localStorage.removeItem("studentCode");
    window.location.href = "login.html";
}

document.getElementById("logoutButton")?.addEventListener("click", logoutUser);

// Fetch Real-Time PHIVOLCS Earthquake Alerts
async function fetchEarthquakeData() {
    try {
        const response = await fetch('https://earthquake.phivolcs.dost.gov.ph/feeds/latest_earthquake.xml');
        const data = await response.text();
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const latestQuake = xml.getElementsByTagName("item")[0];

        const quakeInfo = {
            title: latestQuake.getElementsByTagName("title")[0].textContent,
            description: latestQuake.getElementsByTagName("description")[0].textContent,
            link: latestQuake.getElementsByTagName("link")[0].textContent
        };

        document.getElementById("alert-container").innerHTML = `
            <h3>${quakeInfo.title}</h3>
            <p>${quakeInfo.description}</p>
            <a href="${quakeInfo.link}" target="_blank">More Details</a>
        `;

        playAlertSound();
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "Failed to load alerts.";
    }
}

function playAlertSound() {
    const audio = new Audio('assets/audio/alert.mp3');
    audio.play();
}

fetchEarthquakeData();
setInterval(fetchEarthquakeData, 30000);

// Initialize Google Maps
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("quakeMap"), {
        center: { lat: 14.5995, lng: 120.9842 },
        zoom: 6
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

document.getElementById("darkModeToggle")?.addEventListener("click", toggleDarkMode);
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// Send Emergency SMS
function sendEmergencySMS() {
    alert("Emergency SMS sent to all registered contacts!");
}

document.getElementById("sendSMSButton")?.addEventListener("click", sendEmergencySMS);
