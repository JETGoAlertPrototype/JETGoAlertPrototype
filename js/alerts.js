// Show latest earthquakes in alert-container
function displayEarthquakeAlerts(earthquakes) {
    const container = document.getElementById("alert-container");
    container.innerHTML = earthquakes.length
        ? earthquakes.map(eq => `<p><strong>${eq.place}</strong> - Magnitude: ${eq.mag}</p>`).join("")
        : "No recent earthquakes detected.";
}

// Show alert & play sound if earthquake is M5.0+
function triggerEmergencyAlert(quakes) {
    const significant = quakes.filter(q => q.mag >= 5.0);
    if (!significant.length) return;

    let alertMessage = significant.map(q => `🚨 M${q.mag} - ${q.place}`).join("\n");
    alert(alertMessage);
    playAlertSound();
}

// 🔔 Play alert sound function
function playAlertSound() {
    new Audio('assets/audio/alert.mp3').play();
}
