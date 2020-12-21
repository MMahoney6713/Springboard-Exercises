
async function createGif(searchTerm) {
    try {
        const gif = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`)
        createGifHTML(gif.data.data[0].images.downsized_medium.url);
    } catch (error) {
        alert('Could not find based on your search')
    }
}

function createGifHTML(gifURL) {
    $(`
        <div class="col-4 my-2">
            <img class="img-fluid" src="${gifURL}">
        </div>
    `).appendTo($('#gifs'));
}


$(function () {

    $('form').on('submit', function (event) {
        event.preventDefault();
        const searchInput = $('#search');
        createGif(searchInput.val());
        searchInput.val('');
    })

    $('.removeGifs').on('click', function () {
        $('#gifs').children().remove();
    })

})