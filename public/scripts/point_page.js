$(() => {
  loadPoint();
})

const loadPoint = () => {
  $.ajax('maps/points/1', { method: 'GET' })
    .then(map => {
      $.ajax('/users/1', { method: 'GET' }) // get owner's data
        .then(data => {
          userName = data.name;
          createPointHTML(map, userName);
          return;
        })
        .catch(err => {
          res.send(err)
        })
    })
}


const createPointHTML = (point, userName) => {

  const title = point.title;
  const description = point.description;
  const photo = point.photo_url;
  const user = userName;


  // HTML
  $('#main-content').prepend(
    `
    <h2 id="title">${title}</h2>
    <div class="point">
        <p class="owner">Map added by: <a href="/user">${user}</a></p>
        <p class="description">${description}</p>
        <img src=${photo}>
    </div>
    <form method="GET" action="/editPoint">
        <button type="submit">Edit point</button>
    </form>
    <form method="GET" action="/">
        <button type="submit">Delete point</button>
    </form>
    `
  )
}


// for delete button add some effects like alert('Deleted!')


// get users name instead of id
// give the proper user id to link to the user's profile
// add CSS
// add link to user profile