let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("quakeMap"), {
        center: { lat: 14.5995, lng: 120.9842 }, 
        zoom: 6
    });

    fetch('data/evac_centers.json')
        .then(response => response.json())
        .then(data => {
            data.centers.forEach(center => {
                new google.maps.Marker({
                    position: { lat: center.lat, lng: center.lng },
                    map,
                    title: center.name,
                    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                });
            });
        });
}
