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

        document.getElementById("alert-message").innerHTML = `
            <h3>${quakeInfo.title}</h3>
            <p>${quakeInfo.description}</p>
            <a href="${quakeInfo.link}" target="_blank">More Details</a>
        `;

        playAlertSound();
        analyzeLatestEarthquake(quakeInfo.title);
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        document.getElementById("alert-message").innerHTML = "Failed to load alerts.";
    }
}

function playAlertSound() {
    new Audio('assets/audio/alert.mp3').play();
}

function analyzeLatestEarthquake(title) {
    const magnitude = parseFloat(title.match(/M(\d+(\.\d+)?)/)[1]);
    let risk = magnitude >= 7.0 ? "High risk!" : magnitude >= 5.0 ? "Moderate risk" : "Low risk";
    document.getElementById("risk-level").textContent = `Risk Level: ${risk}`;
}

fetchEarthquakeData();
setInterval(fetchEarthquakeData, 30000);
