/* 🔑 USER AUTHENTICATION SYSTEM */
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("studentCode")) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
});

// 📌 Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

/* 🚪 LOGOUT FUNCTION */
document.getElementById("logoutButton")?.addEventListener("click", () => {
    localStorage.removeItem("studentCode");
    window.location.href = "login.html";
});

/* 🌍 FETCH REAL-TIME PHIVOLCS EARTHQUAKE ALERTS */
async function fetchPHIVOLCSEarthquakeData() {
    try {
        const response = await fetch("https://earthquake.phivolcs.dost.gov.ph/feeds/latest_earthquake.xml");
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
        console.error("❌ Error fetching PHIVOLCS earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "⚠️ Failed to load alerts.";
    }
}

/* 🔔 PLAY ALERT SOUND */
function playAlertSound() {
    new Audio('assets/audio/alert.mp3').play();
}

// Fetch PHIVOLCS earthquake data every 30 seconds
fetchPHIVOLCSEarthquakeData();
setInterval(fetchPHIVOLCSEarthquakeData, 30000);

/* 🌎 FETCH GLOBAL EARTHQUAKE DATA */
async function fetchGlobalEarthquakeData() {
    try {
        const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson");
        const data = await response.json();

        data.features.forEach(quake => {
            const magnitude = quake.properties.mag;
            const coords = quake.geometry.coordinates;
            addEarthquakeMarker(coords[1], coords[0], magnitude);
        });
    } catch (error) {
        console.error("❌ Error fetching global earthquake data:", error);
    }
}

// Fetch global earthquake data when page loads
fetchGlobalEarthquakeData();

/* 🔥 NEW FUNCTION: FETCH LATEST EARTHQUAKE ALERTS (USGS) */
async function fetchEarthquakeData() {
    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayEarthquakes(data.features);

        // Trigger alert if any earthquake has a magnitude ≥ 5.0
        const significantQuakes = data.features.filter(quake => quake.properties.mag >= 5.0);
        if (significantQuakes.length > 0) {
            triggerEmergencyAlert("🚨 Significant earthquake detected! Stay safe! 🚨");
        }
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alerts").innerHTML = "<p>Failed to load earthquake data.</p>";
    }
}

// Call fetchEarthquakeData when the page loads
document.addEventListener("DOMContentLoaded", fetchEarthquakeData);

// Function to display earthquake data
function displayEarthquakes(earthquakes) {
    const container = document.getElementById("alert-container");
    container.innerHTML = ""; // Clear previous data

    earthquakes.forEach(quake => {
        const { place, mag, time } = quake.properties;
        const date = new Date(time).toLocaleString();

        const quakeElement = document.createElement("div");
        quakeElement.classList.add("quake-item");
        quakeElement.innerHTML = `<strong>${place}</strong> - Magnitude: ${mag} | ${date}`;
        
        container.appendChild(quakeElement);
    });
}

/* 🚨 EMERGENCY ALERT FUNCTION */
function triggerEmergencyAlert(message) {
    // Create alert box
    let alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    // Play alert sound
    let alertSound = new Audio("/assets/alert-sound.mp3"); // Ensure this path is correct
    alertSound.play();

    // Flash screen effect
    let flash = document.createElement("div");
    flash.className = "flash-effect";
    document.body.appendChild(flash);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertBox.remove();
        flash.remove();
    }, 3000);
}
