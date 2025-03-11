// 🌍 1️⃣ Function: Trigger Emergency Alert
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

// 🌍 2️⃣ Function: Fetch Earthquake Data (USGS API)
async function fetchEarthquakeData() {
    try {
        const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time";
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched earthquake data:", data);
        
        // Process and display the data
        displayEarthquakes(data.features);

        // 🔥 Trigger alert if strong earthquake detected
        const strongQuake = data.features.find(q => q.properties.mag >= 5.0);
        if (strongQuake) {
            triggerEmergencyAlert(`🚨 Earthquake Alert! Magnitude ${strongQuake.properties.mag} detected near ${strongQuake.properties.place}.`);
        }

    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "<p>Failed to load earthquake data.</p>";
    }
}

// 🌍 3️⃣ Function: Display Earthquake Data
function displayEarthquakes(earthquakes) {
    const container = document.getElementById("alert-container");
    container.innerHTML = ""; // Clear previous data

    if (earthquakes.length === 0) {
        container.innerHTML = "<p>No recent earthquakes detected.</p>";
        return;
    }

    earthquakes.forEach(quake => {
        const { place, mag, time } = quake.properties;
        const date = new Date(time).toLocaleString();

        const quakeElement = document.createElement("div");
        quakeElement.classList.add("quake-item");
        quakeElement.innerHTML = `<strong>${place}</strong> - Magnitude: ${mag} | ${date}`;
        
        container.appendChild(quakeElement);
    });
}

// 🌍 4️⃣ Fetch earthquake data when the page loads
document.addEventListener("DOMContentLoaded", fetchEarthquakeData);

// Fetch data & update UI
async function fetchEarthquakeData() {
    const response = await fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time");
    const data = await response.json();
    
    let quakes = data.features.map(q => ({
        place: q.properties.place,
        mag: q.properties.mag
    }));

    displayEarthquakeAlerts(quakes);
    triggerEmergencyAlert(quakes);
}

// Fetch every 30 seconds
setInterval(fetchEarthquakeData, 30000);

// Run once on page load
document.addEventListener("DOMContentLoaded", fetchEarthquakeData);

