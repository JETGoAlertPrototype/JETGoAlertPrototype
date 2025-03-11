document.addEventListener("DOMContentLoaded", function () {
    initMap();
    fetchEarthquakeData();
    fetchPHIVOLCSEarthquakeData();
});

// Initialize Leaflet map
function initMap() {
    window.map = L.map("map").setView([14.5995, 120.9842], 6); // Default: Philippines

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(window.map);
}

// Fetch & plot USGS Earthquake Data
async function fetchEarthquakeData() {
    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        plotEarthquakes(data.features, "USGS"); // Add markers for USGS data
    } catch (error) {
        console.error("Error fetching USGS earthquake data:", error);
    }
}

// Fetch & plot PHIVOLCS Earthquake Data
async function fetchPHIVOLCSEarthquakeData() {
    const apiUrl = "https://earthquake.phivolcs.dost.gov.ph/feeds/latest_earthquake.xml";

    try {
        const response = await fetch(apiUrl);
        const data = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const items = xml.getElementsByTagName("item");

        let earthquakes = [];
        for (let i = 0; i < Math.min(items.length, 5); i++) {
            const title = items[i].getElementsByTagName("title")[0].textContent;
            const description = items[i].getElementsByTagName("description")[0].textContent;

            const locationMatch = description.match(/Location:\s*(.*?)\s*Intensity/);
            const magnitudeMatch = description.match(/Magnitude:\s*([\d.]+)/);
            
            if (locationMatch && magnitudeMatch) {
                earthquakes.push({
                    place: locationMatch[1],
                    mag: parseFloat(magnitudeMatch[1]),
                    coordinates: getCoordinatesFromLocation(locationMatch[1])
                });
            }
        }

        plotEarthquakes(earthquakes, "PHIVOLCS");
    } catch (error) {
        console.error("Error fetching PHIVOLCS earthquake data:", error);
    }
}

// Convert location name to coordinates (Manual mapping)
function getCoordinatesFromLocation(location) {
    const locations = {
        "Manila": [14.5995, 120.9842],
        "Cebu": [10.3157, 123.8854],
        "Davao": [7.1907, 125.4553],
        "Baguio": [16.4023, 120.5960]
    };
    return locations[location] || [14.5995, 120.9842]; // Default to Manila if unknown
}

// Plot earthquakes on the map
function plotEarthquakes(earthquakes, source) {
    earthquakes.forEach(quake => {
        if (!quake.coordinates) return;

        let markerColor = source === "USGS" ? "red" : "blue";
        let icon = L.divIcon({ className: `quake-marker-${markerColor}`, html: "🟢", iconSize: [12, 12] });

        L.marker([quake.coordinates[0], quake.coordinates[1]], { icon })
            .addTo(window.map)
            .bindPopup(`<strong>${quake.place}</strong><br>Magnitude: ${quake.mag}<br>Source: ${source}`);
    });
}
