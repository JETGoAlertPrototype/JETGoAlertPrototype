// maps.js - Initialize Google Maps with Earthquake Epicenters & Evacuation Centers
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("quakeMap"), {
        center: { lat: 14.5995, lng: 120.9842 }, // Manila default
        zoom: 6
    });

    fetch('data/past_quakes.json')
        .then(response => response.json())
        .then(data => {
            data.earthquakes.forEach(quake => {
                new google.maps.Marker({
                    position: { lat: quake.lat, lng: quake.lng },
                    map,
                    title: `Magnitude ${quake.magnitude} Earthquake`,
                    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                });
            });
        });

    fetch('data/evac_centers.json')
        .then(response => response.json())
        .then(data => {
            data.centers.forEach(center => {
                new google.maps.Marker({
                    position: { lat: center.lat, lng: center.lng },
                    map,
                    title: `Evacuation Center: ${center.name}`,
                    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                });
            });
        });
}
