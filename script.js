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
async function fetchEarthquakeData() {
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
        console.error("❌ Error fetching earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "⚠️ Failed to load alerts.";
    }
}

/* 🔔 PLAY ALERT SOUND */
function playAlertSound() {
    new Audio('assets/audio/alert.mp3').play();
}

// Fetch earthquake data every 30 seconds
fetchEarthquakeData();
setInterval(fetchEarthquakeData, 30000);

/* 🗺️ GOOGLE MAPS INITIALIZATION */
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("quakeMap"), {
        center: { lat: 14.5995, lng: 120.9842 }, // Default location: Philippines
        zoom: 6
    });
}

/* 📍 ADD EARTHQUAKE MARKERS TO MAP */
const quakeMarkers = [];

function addEarthquakeMarker(lat, lon, magnitude) {
    const color = magnitude > 6 ? "red" : magnitude > 4 ? "orange" : "yellow";

    const marker = new google.maps.Marker({
        position: { lat, lng: lon },
        map,
        title: `Magnitude: ${magnitude}`
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<strong>Magnitude:</strong> ${magnitude}<br><strong>Location:</strong> (${lat}, ${lon})`
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    quakeMarkers.push(marker);
}

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

// Fetch earthquake data when page loads
fetchGlobalEarthquakeData();

/* 🌙 DARK MODE TOGGLE */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

document.getElementById("darkModeToggle")?.addEventListener("click", toggleDarkMode);

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

/* 📩 SEND EMERGENCY SMS */
document.getElementById("sendSMSButton")?.addEventListener("click", () => {
    alert("📡 Emergency SMS sent to all registered contacts!");
});

/* 🚨 SHOW ALERT FUNCTION */
function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.className = "alert";
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    // Play alert sound
    document.getElementById("alertSound").play();

    // Remove alert after 5 seconds
    setTimeout(() => alertBox.remove(), 5000);
}

/* 📋 EARTHQUAKE REPORT FORM */
document.getElementById("reportForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Stop page reload

    const location = document.getElementById("location").value;
    const magnitude = parseFloat(document.getElementById("magnitude").value);
    const description = document.getElementById("description").value;

    alert(`📍 Earthquake Reported!\n\n📌 Location: ${location}\n🌍 Magnitude: ${magnitude}\n📄 Details: ${description}`);

    // Add earthquake to map
    addEarthquakeMarker(14.5995, 120.9842, magnitude);

    // Reset form after submission
    document.getElementById("reportForm").reset();
});

/* ✅ STEP 1: VALIDATE STUDENT CODES */
document.getElementById("studentLoginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const studentCode = document.getElementById("studentCode").value;
    const validCodes = ["123456", "654321", "987654"]; // Example codes

    if (validCodes.includes(studentCode)) {
        localStorage.setItem("studentCode", studentCode);
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("🚫 Invalid student code. Please try again.");
    }
});

/* ✅ STEP 3: FILTER EARTHQUAKE DATA */
document.getElementById("filterMagnitude")?.addEventListener("change", function() {
    const selectedMagnitude = parseFloat(this.value);

    quakeMarkers.forEach(marker => {
        const markerMagnitude = parseFloat(marker.getTitle().replace("Magnitude: ", ""));
        marker.setVisible(markerMagnitude >= selectedMagnitude);
    });
});

/* ✅ STEP 4: EMERGENCY CONTACT LIST */
document.getElementById("addContactForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const contactName = document.getElementById("contactName").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const contactList = document.getElementById("contactList");

    if (contactName && contactNumber) {
        const listItem = document.createElement("li");
        listItem.textContent = `${contactName}: ${contactNumber}`;
        contactList.appendChild(listItem);

        document.getElementById("addContactForm").reset();
    } else {
        alert("⚠️ Please fill in both fields.");
    }
});

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
