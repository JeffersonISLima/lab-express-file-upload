const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

// Map
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myloc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startMap(myloc);
    }, () => {
      console.log('Error in the geolocation service.');
    });
  } else {
    // Browser says: Nah! I do not support this.
    console.log('Browser does not support geolocation.');
  }
}
// End Map

// Start Map - API google maps
function startMap(myloc) {
  const ironhackBCN = {
    lat: -23.547639,
    lng: -46.632838,
  };

  // Market into map 1
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: ironhackBCN,
  });

  // Market into map 2
  const myHome = new google.maps.Marker({
    position: {
      lat: -23.455629,
      lng: -46.750403,
    },
    map,
    title: 'Home',
  });

  // Market into map 3
  const whereAmI = new google.maps.Marker({
    position: myloc,
    map,
    title: 'I am here',
  });

  // Traçando a rota da localização ao destino
  const directionRequest = {
    origin: myloc,
    destination: myHome.position,
    travelMode: 'DRIVING',
  };

  directionsService.route(
    directionRequest,
    (response, status) => {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);
      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    },
  );
  directionsDisplay.setMap(map);
  // Fim do traçado da rota
}

getUserLocation();
