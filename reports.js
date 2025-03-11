// Firebase configuration
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    loadReports();
});

// Submit user report
function submitReport() {
    const reportText = document.getElementById("user-report").value;

    if (reportText.trim() === "") {
        alert("Please enter a report before submitting.");
        return;
    }

    db.collection("earthquakeReports").add({
        report: reportText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById("user-report").value = "";
        loadReports(); // Reload reports
    }).catch(error => console.error("Error submitting report:", error));
}

// Load and display reports
function loadReports() {
    const reportList = document.getElementById("report-list");
    reportList.innerHTML = "Loading reports...";

    db.collection("earthquakeReports").orderBy("timestamp", "desc").get()
        .then(snapshot => {
            reportList.innerHTML = ""; // Clear previous content

            snapshot.forEach(doc => {
                const { report, timestamp } = doc.data();
                const date = timestamp ? timestamp.toDate().toLocaleString() : "Unknown time";

                const reportElement = document.createElement("div");
                reportElement.classList.add("report-item");
                reportElement.innerHTML = `<strong>${date}:</strong> ${report}`;
                
                reportList.appendChild(reportElement);
            });
        })
        .catch(error => console.error("Error loading reports:", error));
}
