document.addEventListener("DOMContentLoaded", () => {
    console.log("JET GO ALERT: Script loaded successfully.");

    // Get User Location
    const getLocationBtn = document.getElementById("get-location-btn");
    const locationDisplay = document.getElementById("location-display");

    if (getLocationBtn) {
        getLocationBtn.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        locationDisplay.innerHTML = `📍 Your location: ${latitude}, ${longitude}`;
                    },
                    (error) => {
                        locationDisplay.innerHTML = "❌ Location access denied.";
                    }
                );
            } else {
                locationDisplay.innerHTML = "⚠️ Geolocation is not supported in this browser.";
            }
        });
    }

    // Trigger Alert Button
    const triggerAlertBtn = document.getElementById("trigger-alert-btn");
    
    if (triggerAlertBtn) {
        triggerAlertBtn.addEventListener("click", () => {
            alert("🚨 Earthquake Alert Triggered! Follow safety procedures.");
        });
    }

    // Check Earthquake Data Button
    const checkEarthquakeBtn = document.getElementById("check-earthquake-btn");

    if (checkEarthquakeBtn) {
        checkEarthquakeBtn.addEventListener("click", async () => {
            try {
                const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
                const data = await response.json();
                
                if (data.features.length > 0) {
                    const latestQuake = data.features[0];
                    const { mag, place, time } = latestQuake.properties;
                    const quakeTime = new Date(time).toLocaleString();
                    
                    alert(`🌍 Latest Earthquake:
                    Magnitude: ${mag}
                    Location: ${place}
                    Time: ${quakeTime}`);
                } else {
                    alert("✅ No significant earthquakes detected today.");
                }
            } catch (error) {
                alert("⚠️ Failed to retrieve earthquake data.");
                console.error("Error fetching earthquake data:", error);
            }
        });
    }

    // Report an Earthquake Submission
    const reportForm = document.querySelector("#report form");

    if (reportForm) {
        reportForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const experienceText = document.getElementById("quake-experience").value;

            if (experienceText.trim() === "") {
                alert("⚠️ Please describe your earthquake experience.");
                return;
            }

            alert("✅ Earthquake report submitted successfully!");
            document.getElementById("quake-experience").value = "";
        });
    }
});
