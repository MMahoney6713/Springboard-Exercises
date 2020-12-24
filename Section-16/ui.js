// EVERYTHING IN THIS JS FILE WAS DEVELOPED BY SPRINGBOARD

// EVERYTHING IN THIS JS FILE WAS DEVELOPED BY SPRINGBOARD

// EVERYTHING IN THIS JS FILE WAS DEVELOPED BY SPRINGBOARD

$(async function () {
  // cache some selectors we'll be using quite a bit
  const $allStoriesList = $("#all-articles-list");
  const $submitForm = $("#submit-form");
  const $filteredArticles = $("#filtered-articles");
  const $loginForm = $("#login-form");
  const $createAccountForm = $("#create-account-form");
  const $ownStories = $("#my-articles");
  const $navLogin = $("#nav-login");
  const $navLogOut = $("#nav-logout");



  ////////////////////////////////////////////////////////////////////////////////////
  //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//

  // ADDING SELECTORS FOR THE ADDITIONAL LINKS FOR SUBMITTING, VIEWING FAVORITES, AND
  // VIEWING MY STORIES

  const $newStoryForm = $("#newStory-form");
  const $navSubmit = $("#nav-submit");
  const $navFavorites = $("#nav-favorites");
  const $navMyStories = $("#nav-myStories");
  const $articlesContainer = $(".articles-container");
  const $favoritedArticlesList = $("#favorited-articles");

  //................................................................................//
  ////////////////////////////////////////////////////////////////////////////////////




  // global storyList variable
  let storyList = null;

  // global currentUser variable
  let currentUser = null;

  await checkIfLoggedIn();



  ////////////////////////////////////////////////////////////////////////////////////
  //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//

  // ADDING ADDITIONAL EVENT LISTENERS FOR THE ABOVE ADDITIONAL SELECTORS

  $newStoryForm.on("submit", async function (event) {
    event.preventDefault();

    const newStory = {
      author: $('#newStory-author').val(),
      title: $('#newStory-title').val(),
      url: $('#newStory-url').val()
    }

    const newStoryAdded = await StoryList.addStory(currentUser, newStory);

    $newStoryForm.trigger('reset');
    $newStoryForm.slideToggle(200);
    await generateStories();
    $allStoriesList.show();
  });

  $navSubmit.on("click", function () {
    // Show the New Story Form
    $newStoryForm.slideToggle(200);
  });

  $navFavorites.on("click", function () {
    hideElements();
    generateFavoriteStories();

  });

  $navMyStories.on("click", function () {

  });

  $articlesContainer.on("click", '.favoritesIcon', async function () {
    const favoriteStatus = $(this);
    const currentStoryId = favoriteStatus.parent().attr('id');
    if (checkIfInFavorites(currentStoryId)) {
      await User.removeFavorite(currentUser, currentStoryId);
    } else {
      await User.addFavorite(currentUser, currentStoryId);
    }
    $(this).toggleClass(['far', 'fas']);
  });

  function checkIfInFavorites(currentStoryId) {
    if (currentUser) {
      const favoritesIdsArray = currentUser.favorites.map((story) => (story.storyId));
      return favoritesIdsArray.includes(currentStoryId);
    }
    return false;
  }

  function generateFavoriteStories() {
    $allStoriesList.hide();
    $favoritedArticlesList.empty();
    const userFavorites = currentUser.favorites;
    // loop through all of our stories and generate HTML for them
    for (let story of userFavorites) {
      const result = generateStoryHTML(story);
      $favoritedArticlesList.append(result);
    }
    $favoritedArticlesList.slideToggle(200);
  }


  //................................................................................//
  ////////////////////////////////////////////////////////////////////////////////////


  {/* <li id="${story.storyId}">
        <i class="far fa-star"></i> */}



  /**
   * Event listener for logging in.
   *  If successfully we will setup the user instance
   */

  $loginForm.on("submit", async function (evt) {
    evt.preventDefault(); // no page-refresh on submit

    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // call the login static method to build a user instance
    const userInstance = await User.login(username, password);
    // set the global user to the user instance
    currentUser = userInstance;
    syncCurrentUserToLocalStorage();
    loginAndSubmitForm();
    await generateStories();
  });

  /**
   * Event listener for signing up.
   *  If successfully we will setup a new user instance
   */

  $createAccountForm.on("submit", async function (evt) {
    evt.preventDefault(); // no page refresh

    // grab the required fields
    let name = $("#create-account-name").val();
    let username = $("#create-account-username").val();
    let password = $("#create-account-password").val();

    // call the create method, which calls the API and then builds a new user instance
    const newUser = await User.create(username, password, name);
    currentUser = newUser;
    syncCurrentUserToLocalStorage();
    loginAndSubmitForm();
  });

  /**
   * Log Out Functionality
   */

  $navLogOut.on("click", function () {
    // empty out local storage
    localStorage.clear();
    // refresh the page, clearing memory
    location.reload();
    $navSubmit.hide();
    $navFavorites.hide();
    $navMyStories.hide();
  });

  /**
   * Event Handler for Clicking Login
   */

  $navLogin.on("click", function () {
    // Show the Login and Create Account Forms
    $loginForm.slideToggle(200);
    setTimeout(() => $createAccountForm.slideToggle(200), 130);
    $allStoriesList.toggle();
  });

  /**
   * Event handler for Navigation to Homepage
   */

  $("body").on("click", "#nav-all", async function () {
    hideElements();
    await generateStories();
    $allStoriesList.show();
  });

  /**
   * On page load, checks local storage to see if the user is already logged in.
   * Renders page information accordingly.
   */

  async function checkIfLoggedIn() {
    // let's see if we're logged in
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // if there is a token in localStorage, call User.getLoggedInUser
    //  to get an instance of User with the right details
    //  this is designed to run once, on page load
    currentUser = await User.getLoggedInUser(token, username);
    await generateStories();

    if (currentUser) {
      showNavForLoggedInUser();
    }
  }

  /**
   * A rendering function to run to reset the forms and hide the login info
   */

  function loginAndSubmitForm() {
    // hide the forms for logging in and signing up
    $loginForm.hide();
    $createAccountForm.hide();

    // reset those forms
    $loginForm.trigger("reset");
    $createAccountForm.trigger("reset");

    // show the stories
    $allStoriesList.show();

    // update the navigation bar
    showNavForLoggedInUser();
  }

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyListInstance. Then render it.
   */

  async function generateStories() {
    // get an instance of StoryList
    const storyListInstance = await StoryList.getStories();
    // update our global variable
    storyList = storyListInstance;
    // empty out that part of the page
    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
      const result = generateStoryHTML(story);
      $allStoriesList.append(result);
    }
  }

  /**
   * A function to render HTML for an individual Story instance
   */

  function generateStoryHTML(story) {
    const hostName = getHostName(story.url);

    let favoritesIconDescriptor = '';
    if (checkIfInFavorites(story.storyId)) {
      favoritesIconDescriptor = 'fas';
    } else {
      favoritesIconDescriptor = 'far';
    }
    // render story markup
    const storyMarkup = $(`
      <li id="${story.storyId}">
        <i class="${favoritesIconDescriptor} fa-star favoritesIcon"></i>
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
        </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `);

    return storyMarkup;
  }

  /* hide all elements in elementsArr */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $filteredArticles,
      $ownStories,
      $loginForm,
      $createAccountForm,
      $newStoryForm,
      $favoritedArticlesList,
    ];
    elementsArr.forEach($elem => $elem.hide());
  }

  function showNavForLoggedInUser() {
    $navLogin.hide();
    $navLogOut.show();
    $navSubmit.show();
    $navFavorites.show();
    $navMyStories.show();
  }

  /* simple function to pull the hostname from a URL */

  function getHostName(url) {
    let hostName;
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2];
    } else {
      hostName = url.split("/")[0];
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4);
    }
    return hostName;
  }

  /* sync current user information to localStorage */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }
});
