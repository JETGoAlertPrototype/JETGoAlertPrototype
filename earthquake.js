async function fetchEarthquakeData() {
    try {
        const response = await fetch("https://earthquake.phivolcs.dost.gov.ph/api/recent");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched earthquake data:", data);

        // Ensure the data contains earthquake reports
        if (data && data.length > 0) {
            const latestQuake = data[0]; // Get the most recent earthquake
            const magnitude = latestQuake.magnitude;
            const location = latestQuake.location;
            const depth = latestQuake.depth;
            const time = latestQuake.time;

            console.log(`Latest earthquake detected: Magnitude ${magnitude}, Location: ${location}`);

            // Set a threshold for alerting (e.g., Magnitude 4.5 or higher)
            if (magnitude >= 4.5) {
                const alertMessage = `🚨 Earthquake Alert! Mag ${magnitude} near ${location} at ${time}.`;
                triggerEmergencyAlert(alertMessage);
            }
        }

        displayEarthquakeData(data); // Update UI with earthquake data
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alerts").innerHTML = "<p>Failed to load earthquake data.</p>";
    }
}

// Fetch earthquake data every 60 seconds
setInterval(fetchEarthquakeData, 60000);

fetchEarthquakeData(); // Run once on page load
