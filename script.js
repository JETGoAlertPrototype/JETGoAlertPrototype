document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = null;

    // 🌍 Google Maps Initialization
    function initMap() {
        let map = new google.maps.Map(document.getElementById("earthquake-map"), {
            center: { lat: 14.5995, lng: 120.9842 },
            zoom: 6,
        });
    }
    window.initMap = initMap;

    // 🔒 User Login
    document.getElementById("login-btn").addEventListener("click", function () {
        let name = document.getElementById("user-name").value.trim();
        let lrn = document.getElementById("lrn-number").value.trim();

        if (name === "" || lrn === "") {
            alert("Please enter both name and LRN number.");
            return;
        }

        loggedInUser = { name, lrn };
        document.getElementById("login-section").style.display = "none";
    });

    // 🚨 Submit Earthquake Report
    document.getElementById("submit-report").addEventListener("click", function () {
        if (!loggedInUser) {
            alert("Please log in before submitting a report.");
            return;
        }

        let experience = document.getElementById("quake-experience").value.trim();
        if (experience === "") {
            alert("Please enter your earthquake experience.");
            return;
        }

        addUserReport(experience, loggedInUser.name);
        document.getElementById("quake-experience").value = "";

        playAlertSound();
        showAlert("🚨 Earthquake alert triggered!", "red", 30000);
    });

    // 📋 Add User Report
    function addUserReport(experience, userName) {
        let reportsContainer = document.getElementById("user-reports");
        let reportItem = document.createElement("li");
        reportItem.textContent = `📢 ${userName}: ${experience}`;
        reportsContainer.appendChild(reportItem);
    }

    // 🚨 Show Alert
    function showAlert(message, color, duration) {
        let alertBox = document.createElement("div");
        alertBox.classList.add("alert-box");
        alertBox.style.background = color;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, duration);
    }

    // 🔊 Play Alert Sound
    function playAlertSound() {
        let audio = new Audio("assets/alert-sound.mp3");
        audio.play();
    }

    // 📡 Fetch Earthquake Data
    function fetchEarthquakeData() {
        let earthquakeInfo = document.getElementById("earthquake-info");
        earthquakeInfo.innerHTML = "<p>📊 Recent Earthquakes: <br> - M6.2 Near Manila<br> - M5.8 Cebu Region<br> - M4.9 Davao Area</p>";
    }
    fetchEarthquakeData();
});
