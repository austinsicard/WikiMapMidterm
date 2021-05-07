$(() => {
  loadContributions();
})

const loadContributions = () => {
  $.ajax(`/users/api/${window.location.pathname.split('/')[2]}/maps/points`, { method: 'GET' })
    .then(maps => {
      if (!maps[0]) {
        $('#main-content').prepend(
        `<div class='title'>
          <span class="heading">
            User did not contribute to any map yet :(
          </span>
        </div>`)
        return;
      }
      $.ajax(`/users/api/${maps[0].user_id}`, { method: 'GET' }) // get owner's data
        .then(data => {
          userName = data.name;
          renderMaps(maps, userName);
          return;
        })
        .catch(err => {
          res.send(err)
        })
      })
}

const renderMaps = function (maps, userName) {
  for (let map of maps) {
    createMapHTML(map, userName);
  }
}

//create new map container
const createMapHTML = function (map, userName) {
  const title = map.title;
  const description = map.description;
  const lat = map.lat;
  const long = map.long;
  const mapid = map.id

  // HTML for a map container
  $('#main-content').prepend(
    `<div class='title'>
        <span class="heading">
          Maps ${userName} contributed to:
        </span>
        <p class="par"> Explore the world with the most popular maps among Wikimaps users in may 2021 </p>
      </div>
      <div class="div-container">
        <main class="index-main">
          < section class= mainmap >
            <a href="/maps/${mapid}"> ${title} </a>
            <p>${description}</p>
            <div id="map-${mapid}" style="width: 100%; height: 20em; position: relative;"></div>
          </section >
        </main>
      </div>`
  );

  // create map element from leaflets
  createMapElement(mapid, lat, long);
};

// create map with leaflets
const createMapElement = function (mapId, lat, long) {
  let mymap = L.map(`map-${mapId}`).setView([lat, long], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHVyYWJpbGxpYW0iLCJhIjoiY2tvYTBtdXQ3Mm1odjJwcXd3MXkycmptcCJ9.NfmIqQQjSypgKHZciDx8rg'
  }).addTo(mymap);
  return mymap;
};