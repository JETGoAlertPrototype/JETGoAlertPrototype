// risk_analysis.js - AI-Driven Earthquake Risk Estimation
function estimateImpact(magnitude, depth) {
    if (magnitude >= 7.0 && depth < 50) return "High risk of structural damage";
    if (magnitude >= 5.0 && depth < 100) return "Moderate risk, stay alert";
    return "Low risk, monitor for aftershocks";
}

function analyzeLatestEarthquake(magnitude, depth) {
    const riskLevel = estimateImpact(magnitude, depth);
    document.getElementById("risk-analysis").innerHTML = `<p>Risk Level: ${riskLevel}</p>`;
}
