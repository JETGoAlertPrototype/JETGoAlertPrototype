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
