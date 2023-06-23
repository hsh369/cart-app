import { add } from "./functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://savemycart-9a5d9-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const db = getDatabase(app);
const dbCart = ref(db, "/cart");

const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
const myCart = document.getElementById("my-cart");

addBtn.addEventListener("click", function () {
  let inputValue = inputField.value;
  if(inputValue === "") return alert("Please enter an item");
  push(dbCart, inputValue);
  clearInput(inputField);
  clearInput(myCart);

  onValue(dbCart, function (snapshot) { 
    if (snapshot.exists()) {
    let cartArray = Object.entries(snapshot.val());
    myCart.innerHTML = "";
    for (let i = 0; i < cartArray.length; i++) {
      let currentItem = cartArray[i];
      // Challenge: Use the appendBookToBooksListEl() function to append book instead of console logging
      renderShoppingList(currentItem);
    }}
    else {
      myCart.innerHTML = "No items in cart";
    }
  });

});

function clearInput(input) {
  input.value = "";
}

function renderShoppingList(item) {
  let new_element = document.createElement("li");
  new_element.textContent = item[1];
  myCart.append(new_element);

  // create delete button
  new_element.addEventListener("click", function () {
    remove(ref(db, `/cart/${item[0]}`));
  });
}
