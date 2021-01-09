$(function () {

    const HOME_URL = 'http://localhost:5000'
    const gameLength = 20;

    let currentScore = 0

    // Saving some useful jquery objects for later use
    const formInput = $('#guess')
    const gameArea = $('#gameDiv')
    const currentScoreCounter = $('#currentScore')
    const highScoreCounter = $('#highScore')
    const startGameButton = $('#startGame')
    const clock = $('#clock')
    const wordLists = $('ul')


    // Button listener to start the game, initialize the timer and set the gameOver function
    startGameButton.on('click', startGame)
    async function startGame() {
        currentScore = 0
        highScore = await getHighScore()
        updateCurrentScore()
        updateHighScore()

        toggleHiddenView()
        const countDownTimer = setInterval(countDown, 1000)
        setTimeout(gameOver, gameLength * 1000, countDownTimer)
    }

    async function gameOver(countDownTimer) {
        highScore = await getHighScore(currentScore)
        updateHighScore()
        toggleHiddenView()
        resetWords()
        formInput.val('')
        clearInterval(countDownTimer)
        clock.text(`${gameLength}`)
    }

    async function getHighScore() {
        const response = await axios.post(`${HOME_URL}/setHighScore`, { "currentScore": currentScore })
        return response.data.highScore
    }

    function updateCurrentScore() {
        currentScoreCounter.text(currentScore)
    }
    function updateHighScore() {
        highScoreCounter.text(highScore)
    }

    function countDown() {
        const currentTime = parseInt(clock.text())
        clock.text(`${currentTime - 1}`)
    }

    function toggleHiddenView() {
        gameArea.toggleClass('hidden')
        startGameButton.toggleClass('hidden')
    }

    function resetWords() {
        wordLists.children().remove()
    }


    // Form submission makes request to server to check the guess, and updates
    // DOM based on server feedback
    $('form').on('submit', handleWordSubmit)
    async function handleWordSubmit(event) {
        event.preventDefault()

        const guessWord = formInput.val()
        const wordStatus = await getWordStatus(guessWord)
        if (wordStatus == "ok") {
            addPoints(guessWord)
            updateCurrentScore()
        }

        // Append the word to the <ul> with the id == the returned server status
        $(`#${wordStatus}`).append(`<li>${guessWord}</li>`)
        formInput.val('')
    }

    async function getWordStatus(word) {
        const response = await axios.get(`${HOME_URL}/guess`, { params: { guess: word } })
        return response.data.result
    }

    function addPoints(word) {
        const newPoints = word.length
        currentScore += newPoints
    }
})