// 🌙 Toggle Dark Mode
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// 🌍 Fetch Earthquake Data from PHIVOLCS API
async function fetchEarthquakeData() {
    try {
        let response = await fetch("https://earthquake.phivolcs.dost.gov.ph/api/latest"); // Sample API endpoint
        let data = await response.json();

        if (data && data.length > 0) {
            let latestEarthquake = data[0];
            document.getElementById("alert-container").innerHTML = `
                <h3>Latest Earthquake Alert</h3>
                <p><strong>Magnitude:</strong> ${latestEarthquake.magnitude}</p>
                <p><strong>Location:</strong> ${latestEarthquake.location}</p>
                <p><strong>Depth:</strong> ${latestEarthquake.depth} km</p>
            `;
        } else {
            document.getElementById("alert-container").innerHTML = "<p>No recent earthquake data.</p>";
        }
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "<p>Failed to load earthquake data.</p>";
    }
}

// 🔴 Send User-Reported Earthquake Experience
document.getElementById("submitReport").addEventListener("click", function () {
    let userReport = document.getElementById("userReport").value;
    if (userReport.trim() === "") {
        alert("Please enter your experience before submitting.");
        return;
    }

    let reportList = document.getElementById("reportList");
    let newReport = document.createElement("li");
    newReport.textContent = userReport;
    reportList.appendChild(newReport);

    document.getElementById("userReport").value = ""; // Clear input
});

// 📌 Load Earthquake Map (Google Maps)
function initMap() {
    let map = new google.maps.Map(document.getElementById("quakeMap"), {
        center: { lat: 14.5995, lng: 120.9842 }, // Default to the Philippines
        zoom: 6,
    });

    // Example marker (Replace with real data)
    new google.maps.Marker({
        position: { lat: 14.5995, lng: 120.9842 },
        map: map,
        title: "Earthquake Epicenter",
    });
}

// 🚀 Initialize functions when page loads
window.onload = function () {
    fetchEarthquakeData();
    initMap();
};

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if Dark Mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Toggle Dark Mode on button click
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save user preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

