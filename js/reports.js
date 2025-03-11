document.addEventListener("DOMContentLoaded", () => {
    loadReports();
});

function submitReport() {
    const reportInput = document.getElementById("user-report");
    const reportText = reportInput.value.trim();

    if (reportText === "") {
        alert("Please enter a report before submitting.");
        return;
    }

    const report = {
        text: reportText,
        timestamp: new Date().toLocaleString()
    };

    let reports = JSON.parse(localStorage.getItem("earthquakeReports")) || [];
    reports.push(report);
    localStorage.setItem("earthquakeReports", JSON.stringify(reports));

    reportInput.value = ""; // Clear input field
    loadReports(); // Refresh report list
}

function loadReports() {
    const reportList = document.getElementById("report-list");
    reportList.innerHTML = ""; // Clear the list

    let reports = JSON.parse(localStorage.getItem("earthquakeReports")) || [];
    reports.forEach((report, index) => {
        const reportItem = document.createElement("div");
        reportItem.classList.add("report-item");
        reportItem.innerHTML = `
            <strong>${report.timestamp}</strong>: ${report.text}
            <button class="delete-btn" onclick="deleteReport(${index})">🗑 Delete</button>
        `;
        reportList.appendChild(reportItem);
    });
}

function deleteReport(index) {
    let reports = JSON.parse(localStorage.getItem("earthquakeReports")) || [];
    
    if (confirm("Are you sure you want to delete this report?")) {
        reports.splice(index, 1); // Remove the selected report
        localStorage.setItem("earthquakeReports", JSON.stringify(reports));
        loadReports(); // Refresh the list
    }
}
