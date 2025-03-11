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
