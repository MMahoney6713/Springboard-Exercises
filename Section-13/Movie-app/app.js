
// Create an array to store movie objects into
const movies = [];

$(function () {

    $('form').on('submit', function (event) {
        event.preventDefault();
        const title = $('#title').get()[0].value;
        const rating = $('#rating').get()[0].value;
        if (title && rating) {
            const newMovieDiv = $(`<div>${title} | ${rating} </div>`).appendTo($('section'));
            addDeleteBtn(newMovieDiv);
            movies.push(newMovieDiv);
        }
        $('#title').val('');
        $('#rating').val('');
    })

    const addDeleteBtn = (newMovieDiv) => {
        $('<button>Remove</button>').addClass('deleteBtn').appendTo(newMovieDiv);
    }

    $('section').on('click', '.deleteBtn', function () {
        $(this).parent().remove();
    })

    $('section').on('click', '.sortBtn', function () {
        const sortType = $(this).attr('class').split(' ')[1];
        const direction = $(this).attr('class').split(' ')[2];
        sortMoviesByType(sortType, direction);
    })

    const sortMoviesByType = (sortType, direction) => {
        if (sortType === 'titles') {
            movies.sort((a, b) => a - b);
        } else {
            movies.sort((a, b) => b - a);
        }
    }

    const sortMoviesByDirection = (direction) => {

    }


})