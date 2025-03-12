document.addEventListener("DOMContentLoaded", function () {
    // 🌍 Get User Location (FIXED)
    document.getElementById("find-location").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    
                    document.getElementById("user-location").textContent =
                        📍 Latitude: ${latitude}, Longitude: ${longitude};

                    // Update Google Maps iframe (if needed)
                    let mapIframe = document.getElementById("earthquake-map");
                    if (mapIframe) {
                        mapIframe.innerHTML = <iframe width="100%" height="300" src="https://www.google.com/maps?q=${latitude},${longitude}&output=embed"></iframe>;
                    }
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
        playAlertSound();
        showAlert("🚨 Earthquake alert triggered!", "red");
    });

    // 📡 Check Earthquake Data (Placeholder API Call)
    document.getElementById("check-earthquake-data").addEventListener("click", function () {
        fetchEarthquakeData();
    });

    // 📢 Report an Earthquake (FIXED)
    document.getElementById("submit-report").addEventListener("click", function () {
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

    let message = 🌍 Earthquake detected! \nLocation: ${earthquakeData.location} \nMagnitude: ${earthquakeData.magnitude} \nTime: ${earthquakeData.time};
    showAlert(message, "orange");
}

/* 🌏 Add User Report */
function addUserReport(experience) {
    let reportsContainer = document.getElementById("user-reports");
    let reportItem = document.createElement("li");
    reportItem.textContent = 📢 ${experience};
    reportsContainer.appendChild(reportItem);
}
