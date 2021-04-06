$(function() {

    const BASE_URL = "http://localhost:5000";

    $('#newMessageForm').on('submit', async function(event) {
        event.preventDefault();

        const formTextInput = $('#newMessageText');

        if (formTextInput.val() !== '') {
            const response = await axios.post(`${BASE_URL}/messages`, {
                text: formTextInput.val()
              });
            
            const message = new Message(response.data.message);
            const user = new User(response.data.user);
    
            const messageHTML = message.toHTML(user);
            $('#messages').prepend(messageHTML);

            $('#newMessageModal').modal('hide');
            formTextInput.val('');
        } else {
            $('#newMessageWarning').show();
        }
    })

    $('#newMessageModal').on('hidden.bs.modal', function() {
        $('#newMessageWarning').hide();
    })
});