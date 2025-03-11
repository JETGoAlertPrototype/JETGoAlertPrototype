// 1️⃣ ADD IT AT THE BEGINNING OR END OF THE FILE
function triggerEmergencyAlert(message) {
    // Create alert box
    let alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    // Play alert sound
    let alertSound = new Audio("/assets/alert-sound.mp3"); // Updated path
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

// 2️⃣ MAKE SURE TO CALL THIS FUNCTION INSIDE fetchEarthquakeData()
async function fetchEarthquakeData() {
    try {
        const response = await fetch("https://earthquake.phivolcs.dost.gov.ph/api/recent");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched earthquake data:", data);
        displayEarthquakeData(data);

        // 🔥 ADD THIS LINE TO TRIGGER ALERT WHEN EARTHQUAKE IS DETECTED 🔥
        if (data.length > 0) {  // Assuming data contains earthquake events
            triggerEmergencyAlert("🚨 Earthquake detected! Stay safe! 🚨");
        }
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alerts").innerHTML = "<p>Failed to load earthquake data.</p>";
    }
}

// Fetch earthquake data when the page loads
fetchEarthquakeData();



function triggerEmergencyAlert(message) {
    // Create alert box
    let alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    // Play alert sound
   let alertSound = new Audio("/assets/Earthquake Drill Sound Effect.mp3"); 
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

document.addEventListener("DOMContentLoaded", function () {
    fetchEarthquakeData();
});

// Function to fetch earthquake data from USGS API
function fetchEarthquakeData() {
    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayEarthquakes(data.features))
        .catch(error => console.error("Error fetching earthquake data:", error));
}

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
