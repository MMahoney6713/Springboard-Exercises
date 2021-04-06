
class Message {
    constructor(messageObj) {
      this.id = messageObj.id;
      this.text = messageObj.text;
      this.timestamp = messageObj.timestamp;
    }

    toHTML(user) {
        if (user instanceof User) {

            return $(`
            <li class="list-group-item" data-messageID="${this.id}">
                <a href="/messages/${this.id}" class="message-link"</a>
                <a href="/users/${user.id}">
                    <img src="${user.image_url}" alt="" class="timeline-image">
                </a>
                <div class="message-area">
                    <a href="/users/${user.id}">@${user.username}</a>
                    <span class="text-muted">${this.timestamp}</span>
                    <p>${this.text}</p>
                </div>
            </li>
            `);
        }
    }
}


class User {
    constructor(userObj) {
      this.id = userObj.id;
      this.username = userObj.username;
      this.image_url = userObj.image_url;
    }
}