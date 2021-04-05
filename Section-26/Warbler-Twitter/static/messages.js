$(function() {

    const BASE_URL = "http://localhost:5000";

    $('#newMessageForm').on('submit', async function(event) {
        event.preventDefault();

        const formTextInput = $('#newMessageText');

        if (formTextInput.val() !== '') {
            const response = await axios.post(`${BASE_URL}/messages`, {
                text: formTextInput.val()
              });
    
            addMessageHTML(response.data.message, response.data.user)
            $('#newMessageModal').modal('hide');
            formTextInput.val('');
        } else {
            $('#newMessageWarning').show()
        }
    })

    $('#newMessageModal').on('hidden.bs.modal', function() {
        $('#newMessageWarning').hide()
    })

    function addMessageHTML(message, user) {
        const newMessageHTML = $(`
            <li class="list-group-item">
                <a href="/messages/${message.id}" class="message-link"</a>
                <a href="/users/${user.id}">
                    <img src="${user.image_url}" alt="" class="timeline-image">
                </a>
                <div class="message-area">
                    <a href="/users/${user.id}">@${user.username}</a>
                    <span class="text-muted">${message.timestamp}</span>
                    <p>${message.text}</p>
                </div>
            </li>
        `);

        $('#messages').prepend(newMessageHTML);
    }
});