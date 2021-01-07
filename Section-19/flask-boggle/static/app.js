$(function () {
    const HOME_URL = 'http://localhost:5000'

    $('form').on('submit', handleWordSubmit)

    async function handleWordSubmit(event) {
        event.preventDefault()
        const guessWord = $('#guess').val()
        const wordStatus = await getWordStatus(guessWord)
        $(`#${wordStatus}`).append(`<li>${guessWord}</li>`)
        $('#guess').val('')
    }

    async function getWordStatus(word) {
        const response = await axios.post(`${HOME_URL}/guess`, { guess: word })
        return response.data['result']
    }

})