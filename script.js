document.addEventListener("DOMContentLoaded", function () {
    // 🌍 Get User Location
    document.getElementById("find-location").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    
                    document.getElementById("user-location").textContent =
                        `📍 Latitude: ${latitude}, Longitude: ${longitude}`;

                    // Update Google Maps
                    let mapDiv = document.getElementById("earthquake-map");
                    mapDiv.innerHTML = `<iframe width="100%" height="300" src="https://www.google.com/maps?q=${latitude},${longitude}&output=embed"></iframe>`;
                },
                function () {
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // 📢 Report an Earthquake
    document.getElementById("submit-report").addEventListener("click", function () {
        let experience = document.getElementById("quake-experience").value.trim();
        if (experience === "") {
            alert("Please enter your earthquake experience.");
            return;
        }

        // 🔊 Play alert sound
        playAlertSound();

        // 💡 Flash screen effect
        document.body.classList.add("flash");
        setTimeout(() => {
            document.body.classList.remove("flash");
        }, 2000);

        // 📋 Add to User Reports
        addUserReport(experience);

        // Clear input
        document.getElementById("quake-experience").value = "";
    });

});

/* 🔊 Play Alert Sound */
function playAlertSound() {
    let audio = new Audio("assets/alert-sound.mp3"); // Ensure this file exists
    audio.play();
}

/* 🌏 Add User Report */
function addUserReport(experience) {
    let reportsContainer = document.getElementById("user-reports");
    let reportItem = document.createElement("li");
    reportItem.textContent = `📢 ${experience}`;
    reportsContainer.appendChild(reportItem);
}
