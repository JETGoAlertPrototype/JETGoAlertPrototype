document.addEventListener("DOMContentLoaded", function () {
    // 🌍 Redirect if not logged in
    if (!localStorage.getItem("name") || !localStorage.getItem("lrn")) {
        window.location.href = "login.html";
    } else {
        document.getElementById("user-name-display").textContent = `Logged in as: ${localStorage.getItem("name")}`;
    }

    // 🌍 Get User Location
    document.getElementById("find-location").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    document.getElementById("user-location").textContent = `📍 Latitude: ${latitude}, Longitude: ${longitude}`;

                    document.getElementById("earthquake-map").innerHTML = `<iframe width="100%" height="300" src="https://www.google.com/maps?q=${latitude},${longitude}&output=embed"></iframe>`;
                },
                function () {
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // 🚨 Report an Earthquake
    document.getElementById("submit-report").addEventListener("click", function () {
        let experience = document.getElementById("quake-experience").value.trim();
        if (experience === "") {
            alert("Please enter your earthquake experience.");
            return;
        }

        let name = localStorage.getItem("name");
        let reportsContainer = document.getElementById("user-reports");
        let reportItem = document.createElement("li");
        reportItem.textContent = `📢 ${name}: ${experience}`;
        reportsContainer.appendChild(reportItem);

        document.body.classList.add("flash-effect");
        setTimeout(() => {
            document.body.classList.remove("flash-effect");
        }, 30000);

        let audio = new Audio("assets/alert-sound.mp3");
        audio.play();
    });
});

// 📝 Handle Login
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("lrn", document.getElementById("lrn").value);
    window.location.href = "index.html";
});
