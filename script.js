document.addEventListener("DOMContentLoaded", function () {
    // 🌍 Initialize Google Map
    initMap();

    // 📍 Get User Location (FIXED)
    document.getElementById("find-location").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    
                    document.getElementById("user-location").textContent =
                        `📍 Latitude: ${latitude}, Longitude: ${longitude}`;

                    // Update map with user location
                    updateMap(latitude, longitude);
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
    document.getElementById("submit-report").addEventListener("click", function () {
        let experience = document.getElementById("quake-experience").value.trim();
        if (experience === "") {
            alert("Please enter your earthquake experience.");
            return;
        }

        playAlertSound();
        showAlert("🚨 Earthquake alert triggered!", "red");
        addUserReport(experience);
        document.getElementById("quake-experience").value = ""; // Clear input after submission
    });

    // 📡 Check Earthquake Data
    document.getElementById("check-earthquake-data").addEventListener("click", function () {
        fetchEarthquakeData();
    });
});

/* 🌍 Initialize Google Map */
function initMap() {
    const map = new google.maps.Map(document.getElementById("earthquake-map"), {
        center: { lat: 14.5995, lng: 120.9842 }, // Manila, Philippines
        zoom: 6
    });

    // Example marker (Manila)
    new google.maps.Marker({
        position: { lat: 14.5995, lng: 120.9842 },
        map,
        title: "Example Earthquake"
    });

    window.currentMap = map; // Store for updating later
}

/* 📌 Update Map with User Location */
function updateMap(latitude, longitude) {
    let userPosition = { lat: latitude, lng: longitude };

    // Center the map on the user
    window.currentMap.setCenter(userPosition);
    window.currentMap.setZoom(10);

    // Add a marker for user location
    new google.maps.Marker({
        position: userPosition,
        map: window.currentMap,
        title: "Your Location"
    });
}

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
    let reportsContainer = document.getElementById("user-reports");
    let reportItem = document.createElement("li");
    reportItem.textContent = `📢 ${experience}`;
    reportsContainer.appendChild(reportItem);
}
