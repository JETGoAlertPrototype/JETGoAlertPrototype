// reports.js - Handles User-Reported Earthquake Experiences
function submitReport(event) {
    event.preventDefault();
    
    const location = document.getElementById("location").value;
    const intensity = document.getElementById("intensity").value;

    const report = `<p><strong>Location:</strong> ${location} | <strong>Intensity:</strong> ${intensity}</p>`;
    document.getElementById("quakeReports").innerHTML += report;

    saveReport(location, intensity);
}

document.getElementById("quakeReportForm")?.addEventListener("submit", submitReport);

function saveReport(location, intensity) {
    let reports = JSON.parse(localStorage.getItem("quakeReports")) || [];
    reports.push({ location, intensity, time: new Date().toLocaleString() });
    localStorage.setItem("quakeReports", JSON.stringify(reports));
}
