
const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv";

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 */
async function searchShows(query) {
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
          image: MISSING_IMAGE_URL
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
          <button class="btn btn-primary get-episodes">View Episodes</button>
         </div>
       </div>
      `);
    $showsList.append($item);
  }
}

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
async function getEpisodes(id) {
  const episodeInfo = [];
  const episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)

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
  return episodeInfo;
}

// Given the list of episodes, populate the episodes area at bottom of page
function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {
    let $item = $(`
        <li>${episode.name} (season ${episode.season}, number ${episode.number})</li>
      `);
    $episodesList.append($item);
  }
  $("#episodes-area").show();
}

$(function () {

  // Handle search form submission:
  $("#search-form").on("submit", async function handleSearch(event) {
    event.preventDefault();

    const query = $("#search-query").val();
    if (!query) return;

    $("#episodes-area").hide();
    const shows = await searchShows(query);
    populateShows(shows);
  });

  // Handle episode button click:
  $('#shows-list').on('click', '.get-episodes', async function () {
    const id = $(this).parent().data('show-id');
    const episodeInfo = await getEpisodes(id);
    populateEpisodes(episodeInfo);
  })

})
