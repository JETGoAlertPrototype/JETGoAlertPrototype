import { checkLogin, logoutUser } from "./auth.js";
import { fetchEarthquakeData } from "./earthquake.js";
import { initMap } from "./maps.js";
import { analyzeLatestEarthquake } from "./ai_risk.js";
import { toggleDarkMode } from "./darkmode.js";
import { sendEmergencySMS } from "./sms.js";
import { startQuiz } from "./quiz.js";

document.addEventListener("DOMContentLoaded", async () => {
    checkLogin();
    await fetchEarthquakeData();
    analyzeLatestEarthquake();
    setInterval(async () => {
        await fetchEarthquakeData();
        analyzeLatestEarthquake();
    }, 30000);
});

document.getElementById("logoutButton")?.addEventListener("click", logoutUser);
document.getElementById("darkModeToggle")?.addEventListener("click", toggleDarkMode);
document.getElementById("sendSMSButton")?.addEventListener("click", sendEmergencySMS);
document.getElementById("startQuizButton")?.addEventListener("click", startQuiz);
