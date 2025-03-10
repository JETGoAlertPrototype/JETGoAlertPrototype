export function analyzeLatestEarthquake(magnitude, depth) {
    let risk = magnitude >= 7.0 && depth < 50 ? "High Risk" : "Low Risk";
    document.getElementById("risk-analysis").innerHTML = `<p>Risk Level: ${risk}</p>`;
}
