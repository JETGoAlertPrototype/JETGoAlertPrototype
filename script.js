document.addEventListener("DOMContentLoaded", function () {
    console.log("JET GO ALERT script loaded!");

    // ✅ Fix: Trigger Alert Button
    const triggerAlertBtn = document.getElementById("trigger-alert-btn");
    if (triggerAlertBtn) {
        triggerAlertBtn.addEventListener("click", function () {
            showAlert("🚨 Earthquake alert triggered!", "red");
            console.log("Trigger Alert button clicked!");
        });
    } else {
        console.error("Trigger Alert button not found!");
    }

    // ✅ Fix: Get Location Button
    const getLocationBtn = document.getElementById("get-location-btn");
    const locationDisplay = document.getElementById("location-display");

    if (getLocationBtn) {
        getLocationBtn.addEventListener("click", function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        locationDisplay.textContent = `📍 Latitude: ${lat}, Longitude: ${lon}`;
                        console.log("Location fetched:", lat, lon);
                    },
                    function (error) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                locationDisplay.textContent = "⚠️ Location access denied.";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                locationDisplay.textContent = "⚠️ Location unavailable.";
                                break;
                            case error.TIMEOUT:
                                locationDisplay.textContent = "⚠️ Location request timed out.";
                                break;
                            default:
                                locationDisplay.textContent = "⚠️ An unknown error occurred.";
                        }
                    }
                );
            } else {
                locationDisplay.textContent = "⚠️ Geolocation is not supported by this browser.";
            }
        });
    } else {
        console.error("Get Location button not found!");
    }

    // ✅ Function: Show Alert
    function showAlert(message, color) {
        const alertBox = document.createElement("div");
        alertBox.textContent = message;
        alertBox.style.position = "fixed";
        alertBox.style.top = "20px";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translateX(-50%)";
        alertBox.style.backgroundColor = color;
        alertBox.style.color = "white";
        alertBox.style.padding = "15px";
        alertBox.style.borderRadius = "5px";
        alertBox.style.zIndex = "1000";
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }

    // ✅ Fetch Recent Earthquakes
    function fetchEarthquakeData() {
        fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
            .then(response => response.json())
            .then(data => {
                displayEarthquakeData(data.features);
            })
            .catch(error => console.error("Error fetching earthquake data:", error));
    }

    // ✅ Display Earthquake Data
    function displayEarthquakeData(earthquakes) {
        const earthquakeList = document.getElementById("earthquake-list");
        earthquakeList.innerHTML = "";

        earthquakes.forEach(eq => {
            const magnitude = eq.properties.mag;
            const place = eq.properties.place;
            const time = new Date(eq.properties.time).toLocaleString();

            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${magnitude}M</strong> - ${place} <br> <small>${time}</small>`;
            earthquakeList.appendChild(listItem);
        });
    }

    // ✅ User-Reported Earthquake Submissions
    const reportForm = document.getElementById("report-form");
    if (reportForm) {
        reportForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const userLocation = document.getElementById("report-location").value;
            const userExperience = document.getElementById("report-experience").value;
            if (userLocation && userExperience) {
                addUserReport(userLocation, userExperience);
                reportForm.reset();
                showAlert("Report submitted! Thank you for your input.", "green");
            } else {
                showAlert("⚠️ Please fill out all fields.", "orange");
            }
        });
    }

    // ✅ Add User Report to List
    function addUserReport(location, experience) {
        const reportList = document.getElementById("user-reports");
        const reportItem = document.createElement("li");
        reportItem.innerHTML = `<strong>${location}</strong>: ${experience}`;
        reportList.appendChild(reportItem);
    }

    // ✅ Initialize Map
    function initMap() {
        const map = L.map("earthquake-map").setView([10, 122], 5); // Default Philippines
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
            .then(response => response.json())
            .then(data => {
                data.features.forEach(eq => {
                    const lat = eq.geometry.coordinates[1];
                    const lon = eq.geometry.coordinates[0];
                    const mag = eq.properties.mag;
                    const place = eq.properties.place;

                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`<strong>${mag}M</strong> - ${place}`);
                });
            })
            .catch(error => console.error("Error loading map data:", error));
    }

    // Load map when the page is ready
    if (document.getElementById("earthquake-map")) {
        initMap();
    }

    // Fetch Earthquake Data on Load
    fetchEarthquakeData();
});
