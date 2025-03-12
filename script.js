document.addEventListener("DOMContentLoaded", function () {
    // 🌍 Get User Location
    document.getElementById("get-location-btn").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    document.getElementById("location-display").textContent =
                        "📍 Latitude: " + position.coords.latitude +
                        ", Longitude: " + position.coords.longitude;
                },
                function () {
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // 🚨 Trigger Earthquake Alert
    document.getElementById("trigger-alert-btn").addEventListener("click", function () {
        showAlert("🚨 Earthquake alert triggered!", "red");
    });

    // 📡 Check Earthquake Data (Placeholder API Call)
    document.getElementById("check-earthquake-btn").addEventListener("click", function () {
        fetchEarthquakeData();
    });

    // 📢 Report an Earthquake
    document.querySelector("#report form").addEventListener("submit", function (event) {
        event.preventDefault();
        let experience = document.getElementById("quake-experience").value;
        if (experience.trim() === "") {
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
    }, 3000);
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
    let userReportsSection = document.getElementById("user-reports");
    let reportDiv = document.createElement("div");
    reportDiv.classList.add("user-report");
    reportDiv.textContent = `📢 ${experience}`;
    userReportsSection.appendChild(reportDiv);
}
