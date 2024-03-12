const message1 = {
    createdBy: "divad nietslloh",
    createdOn: new Date('March 06, 2024 13:01:00'),
    channel: "channel4",
    own: false,
    text: `what is this bullshit m8`,
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() > 1
    }
};

const message2 = {
    createdBy: "argermager",
    createdOn: new Date('March 06, 2024 13:12:00'),
    channel: "channel4",
    own: false,
    text: `<iframe style="border-radius:12px" 
           src="https://open.spotify.com/embed/track/0B4gBXd4XLXGvaBl7pI2vL?utm_source=generator"
           width="100%" height="352" 
           frameBorder="0" 
           allowfullscreen="" 
           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
           loading="lazy"></iframe>`,
   yesterdayOrOlder() {
    return new Date().getDate() - this.createdOn.getDate() > 1
}
};

const message3 = {
    createdBy: "simasamse",
    createdOn: new Date('March 06, 2024 13:31:00'),
    channel: "channel4",
    own: true,
    text: `haha you hater c***s. 
           make supreme great again 
           dudes hangloose mofos`,
   yesterdayOrOlder() {
    return new Date().getDate() - this.createdOn.getDate() > 1
}
};

const message4 = {
    createdBy: "argermager",
    createdOn: new Date('March 06, 2024 13:32:00'),
    channel: "channel4",
    own: false,
    text: `ahhahaha you bitch, funky bitch`,
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() > 1
    }
};

const mockMessages = [
    message1, message2,
    message3, message4]