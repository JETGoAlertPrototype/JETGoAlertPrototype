export function initMap() {
    let map = new google.maps.Map(document.getElementById("quakeMap"), {
        center: { lat: 14.5995, lng: 120.9842 },
        zoom: 6
    });
}
