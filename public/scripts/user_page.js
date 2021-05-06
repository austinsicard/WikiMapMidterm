$(() => {
  loadUser();
})

const loadUser = () => {
  $.ajax(`/users/api/${window.location.pathname.split('/')[2]}`, { method: 'GET' })
  .then(data => {
    createUserHTML(data);
  })
  .catch(err => {
    res.send(err);
  })
};

const createUserHTML = (user) => {
  console.log(user);
  const name = user.name;
  const email = user.email;
  const photo = user.photo_url;

  // HTML 
  // give: picture, name, email
  $('#main-content').prepend(
    `<span id="greeting"> Hello, ${user.name}!>
    <div class="user">
      <span>${name}</span>
      <img src=${photo}>
        <div class="info">
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
        </div>
    </div>`
  );

  $('#main-content').append(
    `
    <div class="user-btns">
      
        <form method="GET" action="/maps/new">
          <button type="submit">Create map</button>
        </form>

        <form method="GET" action="/user-maps">
          <button type="submit">My maps</button>
        </form>

        <form method="GET" action="/user-points">
          <button type="submit">My points</button>
        </form>

        <form method="GET" action="/favorites">
          <button type="submit">My favorites</button>
        </form>

    </div>
    `
  );

  // if user id(from session) === user profile id
  // its 'own profile
  // give: create map, my maps, my points, my favourites


  //STRETCH

  // if user !== user profile id
  // it's somebody elses profile
  // give: user's maps, user's point

  
}


