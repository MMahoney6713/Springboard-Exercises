
class Message {
    constructor(messageObj) {
      this.id = messageObj.id;
      this.text = messageObj.text;
      this.timestamp = messageObj.timestamp;
    }
}


class User {
    constructor(userObj) {
      this.id = userObj.id;
      this.username = userObj.username;
      this.image_url = userObj.image_url;
    }
}