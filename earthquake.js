// earthquake.js - Fetch Real-Time PHIVOLCS Data
async function fetchEarthquakeData() {
    try {
        const response = await fetch('https://earthquake.phivolcs.dost.gov.ph/feeds/latest_earthquake.xml');
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const latestQuake = xml.getElementsByTagName("item")[0];
        const quakeInfo = {
            title: latestQuake.getElementsByTagName("title")[0].textContent,
            description: latestQuake.getElementsByTagName("description")[0].textContent,
            link: latestQuake.getElementsByTagName("link")[0].textContent
        };
        document.getElementById("alert-container").innerHTML = `
            <h3>${quakeInfo.title}</h3>
            <p>${quakeInfo.description}</p>
            <a href="${quakeInfo.link}" target="_blank">More Details</a>
        `;
        playAlertSound();
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alert-container").innerHTML = "Failed to load alerts.";
    }
}

function playAlertSound() {
    const audio = new Audio('assets/audio/alert.mp3');
    audio.play();
}

fetchEarthquakeData();
setInterval(fetchEarthquakeData, 30000);
