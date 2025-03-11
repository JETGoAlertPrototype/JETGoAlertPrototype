/* 🌍 FETCH REAL-TIME EARTHQUAKE DATA (USGS) */
async function fetchEarthquakeData() {
    try {
        const response = await fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time");
        const data = await response.json();

        let quakes = data.features.map(q => ({
            place: q.properties.place,
            mag: q.properties.mag
        }));

        displayEarthquakeAlerts(quakes);
        triggerEmergencyAlert(quakes);
    } catch (error) {
        console.error("❌ Error fetching earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "⚠️ Failed to load alerts.";
    }
}

/* 🚨 DISPLAY EARTHQUAKE ALERTS IN UI */
function displayEarthquakeAlerts(earthquakes) {
    const container = document.getElementById("alert-container");
    container.innerHTML = earthquakes.length
        ? earthquakes.map(eq => `<p><strong>${eq.place}</strong> - Magnitude: ${eq.mag}</p>`).join("")
        : "No recent earthquakes detected.";
}

/* 🚨 TRIGGER ALERT FOR SIGNIFICANT EARTHQUAKES (M5.0+) */
function triggerEmergencyAlert(quakes) {
    const significant = quakes.filter(q => q.mag >= 5.0);
    if (!significant.length) return;

    let alertMessage = significant.map(q => `🚨 M${q.mag} - ${q.place}`).join("\n");
    
    // Show alert box
    let alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.innerText = alertMessage;
    document.body.appendChild(alertBox);

    // Play alert sound
    playAlertSound();

    // Flash screen effect
    triggerFlashEffect();

    // Remove alert after 5 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 5000);
}

/* ⚡ FLASH SCREEN EFFECT */
function triggerFlashEffect() {
    let flash = document.createElement("div");
    flash.className = "flash-effect";
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 1000);
}

/* 🔔 PLAY ALERT SOUND */
function playAlertSound() {
    new Audio('assets/audio/alert.mp3').play();
}

// Fetch earthquake data every 30 seconds
setInterval(fetchEarthquakeData, 30000);

// Fetch on page load
document.addEventListener("DOMContentLoaded", fetchEarthquakeData);

