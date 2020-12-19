
// Create an array to store movie objects into
const movies = [];

const addMovieToDom = (title, rating) => {
    const newMovieDiv = $(`<div>${title} | ${rating} </div>`).appendTo($('section'));
    addDeleteBtn(newMovieDiv);
    return newMovieDiv;
}

const addDeleteBtn = (newMovieDiv) => {
    $('<button>Remove</button>').addClass('deleteBtn').appendTo(newMovieDiv);
}

const sortMoviesArray = (sortType, direction) => {
    movies.sort((a, b) => {
        if (sortType === 'title') {
            if (a[0].toLowerCase() > b[0].toLowerCase()) {
                return parseInt(`${direction}1`);
            } else {
                return parseInt(`${direction}1`) * -1;
            }
        } else {
            if (parseFloat(a[1]) > parseFloat(b[1])) {
                return parseInt(`${direction}1`);
            } else {
                return parseInt(`${direction}1`) * -1;
            }
        }
    })

    sortMoviesHTML();

}

function sortMoviesHTML() {
    $('section div').remove();
    for (let movie of movies) {
        addMovieToDom(movie[0], movie[1])
    }
}

$(function () {

    /////// EVENT LISTENERS ///////

    $('form').on('submit', function (event) {
        event.preventDefault();
        const title = $('#title').get()[0].value;
        const rating = $('#rating').get()[0].value;
        if (title && rating) {
            const newMovieDiv = addMovieToDom(title, rating);
            movies.push([title, rating, newMovieDiv]);
        }
        $('#title').val('');
        $('#rating').val('');
    })

    $('section').on('click', '.deleteBtn', function () {
        $(this).parent().remove();
    })

    $('section').on('click', '.sortBtn', function () {
        const sortType = $(this).attr('class').split(' ')[1];
        const direction = $(this).attr('class').split(' ')[2];
        sortMoviesArray(sortType, direction);
    })

})