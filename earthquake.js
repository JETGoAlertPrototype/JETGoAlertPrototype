// Fetch Earthquake Data from PHIVOLCS API
async function fetchEarthquakeData() {
    try {
        const response = await fetch('https://earthquake.phivolcs.dost.gov.ph/api/recent');
        const data = await response.json();

        console.log("Earthquake Data:", data); // Debugging: Check console

        // Add earthquake markers
        data.earthquakes.forEach(quake => {
            L.marker([quake.latitude, quake.longitude])
                .addTo(map)
                .bindPopup(`<b>${quake.location}</b><br>Magnitude: ${quake.magnitude}<br>Depth: ${quake.depth} km`);
        });

    } catch (error) {
        console.error("Error fetching earthquake data:", error);
    }
}

// Call function after map loads
fetchEarthquakeData();
