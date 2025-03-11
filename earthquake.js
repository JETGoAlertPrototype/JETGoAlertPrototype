function triggerEmergencyAlert(message) {
    // Create alert box
    let alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    // Play alert sound
    let alertSound = new Audio("alert-sound.mp3"); // Ensure this file exists
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

async function fetchEarthquakeData() {
    try {
        const response = await fetch("https://earthquake.phivolcs.dost.gov.ph/api/recent");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched earthquake data:", data);
        displayEarthquakeData(data);
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alerts").innerHTML = "<p>Failed to load earthquake data.</p>";
    }
}

fetchEarthquakeData();
