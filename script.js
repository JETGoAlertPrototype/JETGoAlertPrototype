document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    // Initialize the Earthquake Map
    let map;
    function initMap() {
        map = new google.maps.Map(document.getElementById("earthquake-map"), {
            center: { lat: 14.5995, lng: 120.9842 }, // Default: Manila
            zoom: 6,
        });

        // Fetch earthquake data and plot markers
        fetchEarthquakeData();
    }

    function fetchEarthquakeData() {
        fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
            .then((response) => response.json())
            .then((data) => {
                data.features.forEach((quake) => {
                    let coords = {
                        lat: quake.geometry.coordinates[1],
                        lng: quake.geometry.coordinates[0],
                    };
                    new google.maps.Marker({
                        position: coords,
                        map: map,
                        title: `Magnitude: ${quake.properties.mag}`,
                    });
                });
            })
            .catch((error) => console.error("Error fetching earthquake data:", error));
    }

    // Fix "Find My Location" Button
    document.getElementById("find-location").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;
                    document.getElementById("user-location").innerText = `Latitude: ${lat}, Longitude: ${lng}`;
                    map.setCenter({ lat, lng });
                    new google.maps.Marker({
                        position: { lat, lng },
                        map: map,
                        title: "Your Location",
                    });
                },
                function (error) {
                    alert("Error getting location. Make sure location services are enabled.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // Fix "User Reports" Submission
    document.getElementById("submit-report").addEventListener("click", function () {
        let reportText = document.getElementById("report-text").value;
        if (reportText.trim() !== "") {
            let reportList = document.getElementById("user-reports");
            let newReport = document.createElement("li");
            newReport.textContent = reportText;
            reportList.appendChild(newReport);
            document.getElementById("report-text").value = "";
        } else {
            alert("Please enter a valid report.");
        }
    });

    // Initialize the map
    initMap();
});
