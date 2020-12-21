/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const showList = [];
  const shows = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)

  for (let show of shows.data) {
    try {
      showList.push(
        {
          id: show.show.id,
          name: show.show.name,
          summary: show.show.summary,
          image: show.show.image.original
        }
      )
    } catch (error) {
      showList.push(
        {
          id: show.show.id,
          name: show.show.name,
          summary: show.show.summary,
          image: 'https://tinyurl.com/tv-missing'
        }
      )
    }
  }
  return showList;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${show.image}" alt="No Image Found">  
          <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
          </div>
          <button class="btn btn-primary episodes">View Episodes</button>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(event) {
  event.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

$('#shows-list').on('click', '.episodes', async function () {
  const id = $(this).parent().attr('data-show-id');
  const episodeInfo = await getEpisodes(id);

})


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const episodeInfo = [];
  const episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  //console.log(episodes);
  // TODO: return array-of-episode-info, as described in docstring above
  for (let episode of episodes.data) {
    episodeInfo.push(
      {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number
      }
    );
  }
  console.log(episodeInfo);
  return episodeInfo;
}
