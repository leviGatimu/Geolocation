let myLat = null;
let myLon = null;
const statusDiv = document.getElementById('status');
const resultDiv = document.getElementById('result');

// --- REQUIREMENT 1: Access User Location ---
function getMyLocation() {
    if (!navigator.geolocation) {
        statusDiv.innerHTML = "<span class='error'>Geolocation is not supported by your browser.</span>";
        return;
    }

    statusDiv.innerText = "Locating...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Success callback
            myLat = position.coords.latitude;
            myLon = position.coords.longitude;
            statusDiv.innerHTML = `✅ Found you at: <br> Lat: ${myLat.toFixed(4)} <br> Lon: ${myLon.toFixed(4)}`;
        },
        (error) => {
            // Error callback (Handle permission denied)
            statusDiv.innerHTML = `<span class='error'>Error: ${error.message}</span>`;
        }
    );
}

// --- REQUIREMENT 2: Calculate Distance ---
function calculateDistance() {
    const targetLat = parseFloat(document.getElementById('targetLat').value);
    const targetLon = parseFloat(document.getElementById('targetLon').value);

    if (myLat === null || myLon === null) {
        resultDiv.innerHTML = "<span class='error'>Please get your location first (Step 1).</span>";
        return;
    }

    // Using the Haversine Formula
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(targetLat - myLat);
    const dLon = deg2rad(targetLon - myLon);
    
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(myLat)) * Math.cos(deg2rad(targetLat)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km

    resultDiv.innerHTML = `📏 Distance: ${distance.toFixed(2)} km`;
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI/180);
}