/*
    Realtime Database
 */

const CHAT_ID = "-MB0ycAOM8VGIXlev5u8";
const PATH = "/chat/" + CHAT_ID + "/messages"; // can make this more detailed (for example add user ID)
const LIMIT = 20; // how many messages to load at a time
var firstChildKey;

function init() {
  initRef();
  clickWithEnterKey();

  const chat = document.getElementById("chat-as-list");
  chat.addEventListener("scroll", addMoreMessagesAtTheTop);
}

// initializes the .on() functions for the database reference
function initRef() {
  // create database reference
  const dbRefObject = firebase.database().ref(PATH);

  const listObject = document.getElementById("chat-as-list");
  // note that when a comment is added it will display more than the limit, which
  // is intentional
  dbRefObject.limitToLast(LIMIT + 1).on("child_added", (snap) => {
    if (!firstChildKey) {
      firstChildKey = snap.key;
    } else {
      const li = document.createElement("li");
      li.innerText = snap.val().content;
      listObject.appendChild(li);
    }
  });
}

function pushChatMessage() {
  const messageInput = document.getElementById("message-input");

  const chatRef = firebase.database().ref(PATH);

  var message = {
    content: messageInput.value,
    timestamp: new Date().getTime()
  };
  // push message to datastore
  chatRef.push(message);
  messageInput.value = null; // clear the message
}

function addMoreMessagesAtTheTop() {
  const dbRefObject = firebase.database().ref(PATH);
  const chat = document.getElementById("chat-as-list");
  if (chat.scrollTop === 0) {
    const oldScrollHeight = chat.scrollHeight;
    dbRefObject
      .orderByKey()
      .endAt(firstChildKey)
      .limitToLast(LIMIT + 1)
      .once("value", (snap) => {
        firstChildKey = null;
        addMessagesToListElement(snap.val(), chat.firstChild, oldScrollHeight);
      });
  }
}

function addMessagesToListElement(messages, firstChild, oldScrollHeight) {
  const chat = document.getElementById("chat-as-list");
  for (var key in messages) {
    if (messages.hasOwnProperty(key)) {
      if (!firstChildKey) {
        firstChildKey = key;
      } else {
        const li = document.createElement("li");
        li.innerText = messages[key].content;
        chat.insertBefore(li, firstChild);
      }
    }
  }
  chat.scrollTop = chat.scrollHeight - oldScrollHeight;
}

function clickWithEnterKey() {
  const messageInput = document.getElementById("message-input");

  messageInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      // 13 is the keycode for the enter key
      pushChatMessage();
    }
  });
}
