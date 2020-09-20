const GROUP_ID = "-MB0ycAOM8VGIXlev5u8";
const PATH = "/group/" + GROUP_ID + "/groceries"; // can make this more detailed (for example add user ID)
const LIMIT = 20; // how many messages to load at a time
var firstChildKey;

function init() {
  initRef();
  clickWithEnterKey();

  const grocery = document.getElementById("groceries-as-list");
  grocery.addEventListener("scroll", addMoreGroceriesAtTheTop);
}

// initializes the .on() functions for the database reference
function initRef() {
  // create database reference
  const dbRefObject = firebase.database().ref(PATH);

  const listObject = document.getElementById("groceries-as-list");
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

function pushChatGrocery() {
  const groceryInput = document.getElementById("grocery-input");

  const groceryRef = firebase.database().ref(PATH);

  var grocery = {
    content: groceryInput.value,
    timestamp: new Date().getTime()
  };
  // push message to datastore
  groceryRef.push(grocery);
  groceryInput.value = null; // clear the message
}

function addMoreGroceriesAtTheTop() {
  const dbRefObject = firebase.database().ref(PATH);
  const chat = document.getElementById("grocery-as-list");
  if (chat.scrollTop === 0) {
    const oldScrollHeight = chat.scrollHeight;
    dbRefObject
      .orderByKey()
      .endAt(firstChildKey)
      .limitToLast(LIMIT + 1)
      .once("value", (snap) => {
        firstChildKey = null;
        addGroceriesToListElement(snap.val(), chat.firstChild, oldScrollHeight);
      });
  }
}

function addGroceriesToListElement(groceries, firstChild, oldScrollHeight) {
  const chat = document.getElementById("groceries-as-list");
  for (var key in groceries) {
    if (groceries.hasOwnProperty(key)) {
      if (!firstChildKey) {
        firstChildKey = key;
      } else {
        const li = document.createElement("li");
        li.innerText = groceries[key].content;
        chat.insertBefore(li, firstChild);
      }
    }
  }
  chat.scrollTop = chat.scrollHeight - oldScrollHeight;
}

function clickWithEnterKey() {
  const groceryInput = document.getElementById("grocery-input");

  groceryInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      // 13 is the keycode for the enter key
      pushChatGrocery();
    }
  });
}
