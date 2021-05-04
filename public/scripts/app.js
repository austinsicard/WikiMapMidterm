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

// HTML FOR A MAP CONTAINER
$('.index-main').prepend(
  `
      <section class="main-section-box">Landmark
        <div id="mapid-1" > ${title} </div>
            <p>${description}</p>
        </section>  `
  );
};