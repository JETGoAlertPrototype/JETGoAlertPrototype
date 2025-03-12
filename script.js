document.addEventListener("DOMContentLoaded", function () {
    // 🌍 Get User Location (FIXED)
    document.getElementById("get-location-btn").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    
                    document.getElementById("location-display").textContent =
                        `📍 Latitude: ${latitude}, Longitude: ${longitude}`;

                    // Update Google Maps iframe
                    let mapIframe = document.getElementById("map-iframe");
                    mapIframe.src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
                },
                function () {
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // 🚨 Trigger Earthquake Alert (FIXED)
    document.getElementById("trigger-alert-btn").addEventListener("click", function () {
        playAlertSound();
        showAlert("🚨 Earthquake alert triggered!", "red");
    });

    // 📡 Check Earthquake Data (Placeholder API Call)
    document.getElementById("check-earthquake-btn").addEventListener("click", function () {
        fetchEarthquakeData();
    });

    // 📢 Report an Earthquake (FIXED)
    document.getElementById("report-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let experience = document.getElementById("quake-experience").value.trim();
        if (experience === "") {
            alert("Please enter your earthquake experience.");
            return;
        }
        addUserReport(experience);
        document.getElementById("quake-experience").value = ""; // Clear input after submission
    });
});

/* 🚨 Show Alert Message */
function showAlert(message, color) {
    let alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.style.background = color;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 4000);
}

/* 🔊 Play Alert Sound */
function playAlertSound() {
    let audio = new Audio("assets/alert-sound.mp3"); // Ensure this file exists
    audio.play();
}

/* 📡 Fetch Earthquake Data (Placeholder Example) */
function fetchEarthquakeData() {
    let earthquakeData = {
        magnitude: 6.2,
        location: "Near Antipolo City",
        time: new Date().toLocaleString(),
    };

    let message = `🌍 Earthquake detected! \nLocation: ${earthquakeData.location} \nMagnitude: ${earthquakeData.magnitude} \nTime: ${earthquakeData.time}`;
    showAlert(message, "orange");
}

/* 🌏 Add User Report */
function addUserReport(experience) {
    let reportsContainer = document.getElementById("reports-container");
    let reportDiv = document.createElement("div");
    reportDiv.classList.add("user-report");
    reportDiv.textContent = `📢 ${experience}`;
    reportsContainer.appendChild(reportDiv);
}
