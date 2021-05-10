// pull out the maps from server database
$(() => {
  createMapHTML();
});

let mymap;

const createPointElement = function(point) {
  let lat = point.lat;
  let long = point.long;
  let title = point.title;
  let description = point.description;
  let pic = point.photo_url;
  let popupinfo = `<div style = display: flex; flex-direction: column; align-items: center;><b>${title}</b><br><img src=${pic} style=width:50px;height:60px;><br>${description}</div>`;
  marker = L.marker([lat, long]).addTo(mymap);
  marker.bindPopup(popupinfo);
  popup = L.popup();
  return point;
};

// create map with leaflets

const createMapElement = function (mapId, lat, long) {
   mymap = L.map(`map-${mapId}`).setView([lat, long], 2);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHVyYWJpbGxpYW0iLCJhIjoiY2tvYTBtdXQ3Mm1odjJwcXd3MXkycmptcCJ9.NfmIqQQjSypgKHZciDx8rg'
  }).addTo(mymap);


  return mymap;
}

//create new map container
const createMapHTML = function (map) {
  const lat = map.lat;
  const long = map.long;
  const mapid = map.id;

  // HTML for a map container
  $('#main-content').prepend(
    `<div id="map-${mapid}" style="width: 50%; height: 20em; position: relative;">
    </div>
    `
  );

  // create map element from leaflets
  createMapElement(mapid, lat, long);
  };
