// Initialize the map centered at the user's location
navigator.geolocation.getCurrentPosition(
    (position) => {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        const map = new google.maps.Map(document.getElementById("map"), {
            center: userLocation,
            zoom: 14,
        });

        // Set the destination (latitude and longitude)
        const destination = {
            lat: 37.7749,
            lng: -122.4194,
        };

        // Calculate and display directions
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
        });

        const request = {
            origin: userLocation,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            }
        });
    },
    (error) => {
        console.error("Error getting user location:", error);
    }
);