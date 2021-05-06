// pull out the maps from server database
$(() => {
  console.log('Page loaded, ajax running')
  loadMap();
})

let mymap;

// get data from endpoint
const loadMap = function () {
  $.ajax('/maps/6', { method: 'GET' }) // mapid is in endpoint
    .then(data => {
      console.log("DATAAAA:", data);
      createMapHTML(data);
  })
    .catch(err => {
    })
};


const createPointElement = function (point){
  let id = point.id
  let lat = point.lat
  let long = point.long
  let title = point.title
  let description = point.description
  let pic = point.photo_url
  let popupinfo = `<div style = display: flex; flex-direction: column; align-items: center;><b>${title}</b><br><img src=${pic} style=width:50px;height:60px;><br>${description}</div>`
  marker = L.marker([lat, long]).addTo(mymap);
  marker.bindPopup(popupinfo);
  popup = L.popup();
  return point;
}

// create map with leaflets

const createMapElement = function (mapId, lat, long) {
   mymap = L.map(`map-${mapId}`).setView([lat, long], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHVyYWJpbGxpYW0iLCJhIjoiY2tvYTBtdXQ3Mm1odjJwcXd3MXkycmptcCJ9.NfmIqQQjSypgKHZciDx8rg'
  }).addTo(mymap);
    //createPointElement(lat, long)


  return mymap;
}

//create new map container
const createMapHTML = function (map) {
  console.log("createMAPHTML:", map)
  const user = map.user_id
  const title = map.title;
  const description = map.description;
  const lat = map.lat;
  const long = map.long;
  const mapid = map.id

  // HTML for a map container
  $('#main-content').prepend(
    ` <p style="margin-top: 4em;
    margin-left: 9em;">Add point to map:</p>
    <h2 class="h2-createPoint" id="title">${title}</h2>

    <div class="test2">
    <div class="test1">

    <form>
        Title:
      <input class="mapid-user"></input>

      Description:
      <input class="mapid-p"></input>

      Image:
      <input></input>
      <button class="button-mapid">Add Point</button>

      </form>
      </div>
      <div id="map-${mapid}" style="width: 50%; height: 20em; position: relative;">
    </div>`
  );



  // create map element from leaflets
  createMapElement(mapid, lat, long);
  }
