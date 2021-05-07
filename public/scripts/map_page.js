// pull out the maps from server database
$(() => {
  loadMap();
})

let mymap;
let userName;

// get data from endpoint
const loadMap = function () {
  $.ajax(`/maps/api/${window.location.pathname.split('/')[2]}`, { method: 'GET' }) // get map data
    .then(map => {
      $.ajax(`/users/api/${map.user_id}`, { method: 'GET' }) // get owner's data
      .then(data => {

        userName = data.name;
        createMapHTML(map, userName);
        return;
      })
      .catch(err => {
        res.send(err)
      });
      $.ajax(`/maps/api/${window.location.pathname.split('/')[2]}/points`, { method: 'GET' }) // get points data
       .then(data => {
        renderPoints(data);
       })
       .catch(err => {
        res.send(err);
      })
  })
    .catch(err => {
    })
};


// loop through the array of point object
const renderPoints = function(data) {
  for (let point of data) {
    createPointElement(point);
  }
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
  return mymap;
}

//create new map container
const createMapHTML = function (map, userName) {
  const user = userName;
  const title = map.title;
  const description = map.description;
  const lat = map.lat;
  const long = map.long;
  const mapid = map.id

  // HTML for a map container
  $('#main-content').prepend(
    `<h2 class="mapid-h2" id="title">${title}</h2>
     <div class="test1">
        <p class="mapid-user">Map created by: ${user}</p>
        <p class="mapid-p">${description}</p>

        <form>
          <button id="fav-btn" type="button">Add to Favorites</button>
        </form>

        <form>
          <a href="/maps/${mapid}/points"> <button id="Add point" type="button">Add point</button> </a>
        </form> 

      </div>
      <section class=mainmap>
        <div id="map-${mapid}" style="width: 100%; height: 50em; position: relative;">
        </div>
      </section>`
  );

  // create map element from leaflets
  createMapElement(mapid, lat, long);


// $('#fav-btn').click(function() {
//   $(this).css('background-color', '#E3E2B7')
//   $(this).html('Added to Favorites')
// })


    $('#fav-btn').click(function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: `/maps/${mapid}/favorites`,
      data: {
        id: $(this).val(),
      },
      success: function (result) {
        $('#fav-btn').css('background-color', '#E3E2B7')
        $('#fav-btn').html('Added to Favorites')
      },
      error: function (result) {
        alert('error');
      }
    });
  });


};
