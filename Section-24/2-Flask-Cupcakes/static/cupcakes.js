$(function() {
    
    const BaseURL = '/api/cupcakes'

    $('form').on('submit', {url:BaseURL}, handleFormSubmission)

    async function handleFormSubmission(event) {
        event.preventDefault()
        const url = event.data.url

        const flavor = $('#flavor')
        const size = $('#size')
        const rating = $('#rating')
        const image = $('#image')

        const newCupcake = {
            flavor: flavor.val(), 
            size: size.val(), 
            rating: rating.val(), 
            image: image.val()
        }

        const response = await axios.post(url, newCupcake)
        
        addCupcakeHTML(newCupcake)
        flavor.val('')
        size.val('')
        rating.val('')
        image.val('')
    }

    async function queryAndShowCupcakes(url) {

        const response = await axios.get(url)
        for (let cupcake of response.data.cupcakes) {
            addCupcakeHTML(cupcake)
        }
    }

    function addCupcakeHTML(cupcake) {
        const flavor = cupcake.flavor
        const size = cupcake.size
        const rating = cupcake.rating
        const image = cupcake.image

        $('.cupcakes-list').append(`
            <li>
                <img src="${image}" width=150> 
                <p>Flavor: ${flavor}</p>
                <p>Size: ${size}</p>
                <p>Rating: ${rating}</p>
            </li>
        `)
    }

    queryAndShowCupcakes(BaseURL)
})