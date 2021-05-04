// pull out the maps from server database
$(document).ready(function () { // should be the only entry point
  loadMaps();
})

const loadMaps = function () {
  console.log('function executing')
  $.ajax('/maps', { method: 'GET' })
    .then(data => {
      renderMaps(data);
    })
    .catch(err => {
    })
};

// loop through the array of map objects
const renderMaps = function (data) { // data is an array of objects
  for (let map of data) { // map is one object with one tweet
    createMapElement(map);
  }
};

//CREATE NEW MAP CONTAINER
const createMapElement = function (map) {
  const title = map.title;
  const description = map.description;
  const lat = map.lat;
  const long = map.long;
  const mapid = map.id
  console.log("something", lat, long)





  // HTML FOR A MAP CONTAINER
  $('.index-main').prepend(
    `<section>
    <div id="map-${mapid}" style="width: 200px; height: 100px; position: relative;"></div>
       <div id="mapid-1" > ${title} </div>
            <p>${description}</p>
        </section> `
  );
 console.log("ending", L);
let maptest =  document.getElementById(`map-${mapid}`);
console.log(maptest);
console.log($(`.index-main`).html())
let mymap = L.map(`map-${mapid}`).setView([lat, long], 12);
            console.log("string", mymap);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZHVyYWJpbGxpYW0iLCJhIjoiY2tvYTBtdXQ3Mm1odjJwcXd3MXkycmptcCJ9.NfmIqQQjSypgKHZciDx8rg'
            }).addTo(mymap);





};
