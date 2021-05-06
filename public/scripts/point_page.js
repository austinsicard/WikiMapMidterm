$(() => {
  loadPoint();
})

const loadPoint = () => {
  $.ajax('maps/points/1', { method: 'GET' })
  .then(data => {
    createPointHTML(data);
  })
  .catch(err => {
    res.send(err);
  })
};

const createPointHTML = (point) => {

  const title = point.title;
  const description = point.description;
  const photo = point.photo_url;
  const user = point.user_id;


  // HTML
  $('#main-content').prepend(
    `
    <h2 id="title">${title}</h2>
    <div class="point">
        <p class="owner">Map added by: <a href="/user">${user}</a></p>
        <p class="description">${description}</p>
        <img src=${photo}>
    </div>
    `
  )

}


// get users name instead of id
// give the proper user id to link to the user's profile
// add CSS
// add link to user profile
