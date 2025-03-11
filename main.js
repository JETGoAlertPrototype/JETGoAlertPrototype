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

document.addEventListener("DOMContentLoaded", () => {
    const getLocationButton = document.getElementById("getLocation");
    const locationOutput = document.getElementById("location-output");
    const safetyTipsDiv = document.getElementById("safety-tips");

    getLocationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    locationOutput.textContent = `Your Coordinates: ${lat}, ${lon}`;

                    // Add user marker to the map
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup("<b>You are here!</b>")
                        .openPopup();

                    // Fetch safety tips
                    showSafetyTips(lat, lon);
                },
                () => {
                    locationOutput.textContent = "Location access denied.";
                }
            );
        } else {
            locationOutput.textContent = "Geolocation is not supported by your browser.";
        }
    });

    function showSafetyTips(lat, lon) {
        let tips = `
            <h3>Earthquake Safety Tips:</h3>
            <ul>
                <li>🛑 Drop, Cover, and Hold On during shaking.</li>
                <li>🚪 If indoors, stay inside and take cover under a sturdy table.</li>
                <li>🌳 If outdoors, stay away from buildings and trees.</li>
                <li>🏢 If near the coast, move to higher ground in case of a tsunami.</li>
            </ul>
        `;

        // Display tips
        safetyTipsDiv.innerHTML = tips;
    }
});

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Request permission to send notifications
function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get the token
      messaging.getToken({ vapidKey: 'YOUR_PUBLIC_VAPID_KEY' }).then((currentToken) => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          // Send the token to your server to subscribe the user to notifications
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

// Call the function to request permission
requestNotificationPermission();

