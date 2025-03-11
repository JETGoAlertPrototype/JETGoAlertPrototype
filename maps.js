document.addEventListener("DOMContentLoaded", function () {
    initMap();
    fetchEarthquakeData();
});

// Initialize Leaflet map
function initMap() {
    window.map = L.map("map").setView([14.5995, 120.9842], 6); // Default view: Philippines

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(window.map);
}

// Fetch earthquake data and plot on the map
function fetchEarthquakeData() {
    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&orderby=time";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => plotEarthquakes(data.features))
        .catch(error => console.error("Error fetching earthquake data:", error));
}

// Plot earthquake locations on the map
function plotEarthquakes(earthquakes) {
    earthquakes.forEach(quake => {
        const { coordinates } = quake.geometry;
        const { place, mag } = quake.properties;

        L.marker([coordinates[1], coordinates[0]])
            .addTo(window.map)
            .bindPopup(`<strong>${place}</strong><br>Magnitude: ${mag}`);
    });
}
