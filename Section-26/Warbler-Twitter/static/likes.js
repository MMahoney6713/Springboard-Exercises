$(function() {

    const BASE_URL = "http://localhost:5000";
    
    $('#messages').on('click', 'button', async function(event){
        event.preventDefault();

        const message = $(event.target).closest('li')
        const response = await axios.post(`${BASE_URL}/users/likes`, {
            messageID: message.data('messageid')
          });
        
        toggleLikes(message)
    })

    function toggleLikes(targetMessage) {
        const button = targetMessage.find('button')
        button.toggleClass(['btn-primary', 'btn-secondary']);
        button.children().first().toggleClass(['fa-star', 'fa-thumbs-up']);
    }
});