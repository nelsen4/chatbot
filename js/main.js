// make sure script is imported
console.log("importedJs")

// init var for selected channel
 let selectedChannel = "";

/* highlight and write channel name into
chat-section headbar 
*/
function switchChannel(selectedChannelID) {
  console.log(selectedChannelID);
  
  if (!!selectedChannel) {
    document.getElementById(selectedChannel.id)
    .classList.remove("selected-channel");
  }
  
  document.getElementById(selectedChannelID)
  .classList.add("selected-channel");

  channels.forEach((channel) => {
    if (channel.id === selectedChannelID) {
      selectedChannel = channel;
    }
  });
  
  showHeader();
  showMessages();
};

// updated title and icon of selected channel
function showHeader() {
  document.getElementById('selectedChannelName').
  innerHTML = selectedChannel.name;
  
  selectedChannel.favorite ? 
    document.getElementById("favorite-button").
    innerHTML = "favorite" :
      document.getElementById("favorite-button").
      innerHTML = "favorite_border";
}


/* create new message with input and post 
to chat-section 
currently simply deletes previous messages
*/
function sendMessage() {
  
  if (!selectedChannel) {
    alert("Select a channel first")
  }
  const text = document.getElementById("message-input").value;
  if (!!text) {
    const myUserName = "simsamse";
    const own = true;
    const channelID = selectedChannel.id;
    const message = 
      new Message(myUserName, own, text, channelID);
    
    console.log("New message: ", message);
    selectedChannel.messages.push(message);
    document.getElementById("message-input").value = "";
    
    showMessages();
    sortChannelsByLatestMessage();
  } else {
    return;
  }
}


function init() {
  console.log("App is initialized");
  getChannels();
  getMessages();
  loadMessagesIntoChannel();
  sortChannelsByLatestMessage();
  //loadEmojis();
  document
    .getElementById("send-button")
    .addEventListener("click", sendMessage);
  //document
  //  .getElementById("emoticon-button")
  //  .addEventListener("click", toggleEmojiArea);
  //document
  //  .getElementById("close-emoticon-button")
  //  .addEventListener("click", toggleEmojiArea);
};

// get existing channels from mock file or database
function getChannels(){
  channels = mockChannels;
  console.log("channels loaded");
};

// get existing messages from mock file or database
function getMessages(){
  messages = mockMessages;
  console.log("messages loaded")
};

// display existing channels to channels section 
function displayChannels() {
  const favoriteList = document
    .getElementById('favorite-channels') 
  const regularList = document
    .getElementById('regular-channels')
  
  favoriteList.innerHTML = "";
  regularList.innerHTML = "";

  channels.forEach((channel) => {
    const currentChannelHtmlString =
      `  <li id="` +
      channel.id +
      `"onclick="switchChannel(this.id)">
      <i class="material-icons">group</i>
      <span class="channel-name">` +
      channel.name +
      `</span>
      <span class="timestamp">` +
      channel.latestMessage() +
      `</span>
      </li>`;
    if (channel.favorite) {
      favoriteList.innerHTML += currentChannelHtmlString;
    } else {
      regularList.innerHTML += currentChannelHtmlString;
    }
  });
};

function loadMessagesIntoChannel() {
  channels.forEach((channel) => {
    messages.forEach((message) => {
      if (channel.id === message.channel) {
        channel.messages.push(message)
      }
     });
    });
};

// constructor function for new messages
function Message(
  creator, 
  own,
  text,
  channel, ) {
    this.createdBy = creator;
    this.createdOn = new Date(Date.now())
    this.channel = channel;
    this.own = own;
    this.text = text;
  };

// show messages of selected chat
function showMessages() {
  var fullChat = ""
  selectedChannel.messages.forEach((message) => {
    
    var currentMessageHtmlString = ""
    currentMessageHtmlString += `<div class="message ` 
    if (message.own) {
      currentMessageHtmlString += "outgoing"
      currentMessageHtmlString += `">
       <div class="message-content-sender">
           <div class="message-wrapper">
               <h2 class="author">`
      + message.createdBy 
      + `</h2>
               <p class="content">` 
      + message.text
      +`</div>
           <span class="timestamp">`;
      
      if (message.yesterdayOrOlder) {
        currentMessageHtmlString += message.createdOn.
        toLocaleDateString(navigator.language, {
          year:"numeric", 
          month:"numeric", 
          day: "numeric"})
      } else { 
        currentMessageHtmlString += message.createdOn
        .toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
        })
      }
      currentMessageHtmlString += `</span>
       </div>
       <i class="material-icons">account_circle</i>
     </div>`;
    
    
    } else {
      currentMessageHtmlString += "incoming" 
      currentMessageHtmlString += `">
      <i class="material-icons">account_circle</i>
      <div class="message-content-sender">
          <div class="message-wrapper">
              <h2 class="author">`
      + message.createdBy 
      + `</h2>
               <p class="content">` 
      + message.text
      +`</div>
          <span class="timestamp">`
      if (message.yesterdayOrOlder) {
        currentMessageHtmlString += message.createdOn.
        toLocaleDateString(navigator.language, {
          year:"numeric", 
          month:"numeric", 
          day: "numeric"})
      } else { 
        currentMessageHtmlString += message.createdOn
        .toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
        })
      }
      currentMessageHtmlString += `</span>
      </div>   
    </div>`;
    }
    
    fullChat += currentMessageHtmlString
  });
  document.getElementById("chat-area").innerHTML = 
       fullChat
};

// open new channel popup window
function openNewChannelPopup () {
  document.getElementById("new-channel-popup")
  .style.display = "block";
}

// close new channel popup window
function closeNewChannelPopup () {
  document.getElementById("new-channel-popup")
  .style.display = "none";
}

// add new channel to channel list
function addNewChannel () {
  // channel name input 
  var channelName = 
  document.getElementById("channel-name-input")
  .value;
  // construct channel obj and add to list
  channels.push(new Channel(channelName))
  // reload channel list
  sortChannelsByLatestMessage();
  closeNewChannelPopup();
};

function Channel (name) {
    this.id= "channel" + (channels.length+1).toString(),
    this.name= name,
    this.favorite= false,
    this.messages= [],
    this.latestMessage= function () {
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

function sortChannelsByLatestMessage () {
  
  channels.sort((a, b) => {
    const latestA = 
    Math.max( 
      Math.max(...a.messages.map(x => x.createdOn)),
      0);
    const latestB = 
    Math.max( 
      Math.max(...b.messages.map(x => x.createdOn)),
      0);
    if (latestA < latestB) {
      return 1;
    }
    if (latestA > latestB) {
      return -1;
    }
    // dates must be equal
    return 0;
  });

  displayChannels();
  
};

function changeFavoriteStatus () {

  document.getElementById('selectedChannelName').
  innerHTML = selectedChannel.name;
  
  selectedChannel.favorite ? 
    selectedChannel.favorite = false :
      selectedChannel.favorite = true;

  showHeader();
  sortChannelsByLatestMessage();
};