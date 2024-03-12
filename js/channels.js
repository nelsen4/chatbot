

const channel1 = {
  id: "channel1",
  name: "ocboyblau",
  favorite: true,
  messages: [],
  latestMessage () {
    if (!!this.messages.length){
        const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
        // if message is from yesterday or older, display date, else display time
        if (new Date().getDate() - latest.getDate() > 1) {
            return latest.toLocaleDateString(navigator.language, {year:"numeric", month:"numeric", day: "numeric"})
        } else {
            return latest.toLocaleTimeString(navigator.language, {hour:"numeric", minute:"numeric"})
        }
    } else {
        return "No Messages"
    }
}
};

const channel2 = {
    id : "channel2",
    name: "zaza",
    favorite: true,
    messages: [],
    latestMessage () {
        if (!!this.messages.length){
            const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
            // if message is from yesterday or older, display date, else display time
            if (new Date().getDate() - latest.getDate() > 1) {
                return latest.toLocaleDateString(navigator.language, {year:"numeric", month:"numeric", day: "numeric"})
            } else {
                return latest.toLocaleTimeString(navigator.language, {hour:"numeric", minute:"numeric"})
            }
        } else {
            return "No Messages"
        }
    }
};

const channel3 = {
    id: "channel3",
    name: "winkmal",
    favorite: true,
    messages: [],
    latestMessage () {
        if (!!this.messages.length){
            const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
            // if message is from yesterday or older, display date, else display time
            if (new Date().getDate() - latest.getDate() > 1) {
                return latest.toLocaleDateString(navigator.language, {year:"numeric", month:"numeric", day: "numeric"})
            } else {
                return latest.toLocaleTimeString(navigator.language, {hour:"numeric", minute:"numeric"})
            }
        } else {
            return "No Messages"
        }
    },
};

const channel4 = {
    id: "channel4",
    name: "MSGA",
    favorite: false,
    messages: [],
    latestMessage () {
        if (!!this.messages.length){
            const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
            // if message is from yesterday or older, display date, else display time
            if (new Date().getDate() - latest.getDate() > 1) {
                return latest.toLocaleDateString(navigator.language, {year:"numeric", month:"numeric", day: "numeric"})
            } else {
                return latest.toLocaleTimeString(navigator.language, {hour:"numeric", minute:"numeric"})
            }
        } else {
            return "No Messages"
        }
    }
};

const mockChannels = [
    channel1, channel2,
    channel3, channel4
];
