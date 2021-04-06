$(function() {

    const BASE_URL = "http://localhost:5000";
    
    $('#messages').on('click', 'button', async function(event){
        
        /////// REMOVE LATER
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



                // <form method="POST" action="/users/toggle_likes/{{ msg.id }}" id="messages-form">
                //     <button class="btn btn-sm {{'btn-primary' if msg.id in likes else 'btn-secondary'}}">
                //         <i class="{{'fa fa-star' if msg.id in likes else 'fa fa-thumbs-up'}}"></i> 
                //     </button>
                // </form>
    
});