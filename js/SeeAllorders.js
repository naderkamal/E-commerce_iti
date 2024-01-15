const userRole = sessionStorage.getItem("userRole");

var arrayString = localStorage.getItem("cartitems");
var cartitems = JSON.parse(arrayString);
window.onload = checkArray;

function checkArray() {
  if (cartitems.length === 0) {
    document.getElementById("contentCart").style.display = "block";
    document.getElementById("cart").style.display = "none";
  } else if (cartitems.length > 0) {
    document.getElementById("contentCart").style.display = "none";
    document.getElementById("cart").style.display = "block";
  }
}

function displaycartitems() {
  var cartitems = JSON.parse(localStorage.getItem("cartitems")) || [];
  var cartList = document.getElementById("cart-items");
  var cartTotal = document.getElementById("cart-total");
  var cartConfirm = document.getElementById("cart-confirm");

  cartList.innerHTML = "";

  // Loop through each item in the cart
  cartitems.forEach((item) => {
    if (item.ConfirmEmail) {
      return; // Skip this item if it's confirmed
    }
    var itemImage = document.createElement("img");
    var itemName = document.createElement("span");
    var itemPrice = document.createElement("span");
    var listItem = document.createElement("li");
    var itemInfo = document.createElement("div");
    var user = document.createElement("div");
    var itemActions = document.createElement("div");
    var deleteButton = document.createElement("button");
    var acceptButton = document.createElement("button");

    //region- "Set attributes and content for the HTML elements"
    if (item && item.photos) {
      itemImage.src = item.photos.startsWith("https") ? item.photos : `./images/${item.photos}`;
    }
    itemName.textContent = item.name;
    itemPrice.textContent = item.price;
    user.textContent = item.UserEmail;
    deleteButton.textContent = "X";
    acceptButton.textContent = "Confirm";
    // Add classes to the HTML elements
    itemInfo.classList.add("item-info");
    user.classList.add("item-info");
    itemName.classList.add("item-name");
    itemPrice.classList.add("item-price");
    itemActions.classList.add("item-actions");
    //endregion

    //region-"Add event listeners for the quantity input and delete button"
    deleteButton.addEventListener("click", () => {
      var index = cartitems.indexOf(item);
      var iteeem = cartitems[index];
      cartitems.splice(index, 1);
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
      location.reload();
      displaycartitems();
    });
    //endregion

    acceptButton.addEventListener("click", (e) => {
      e.preventDefault();
      // Move the declaration of cartitems above its usage
      var index = cartitems.indexOf(item);
      var iteeem = cartitems[index];
      cartitems[index].ConfirmEmail = true;
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
      location.reload();
      displaycartitems();
    });

    //region - "Append the HTML elements to the list item"
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemPrice);
    itemActions.appendChild(acceptButton);
    itemActions.appendChild(deleteButton);
    listItem.appendChild(itemImage);
    listItem.appendChild(itemInfo);
    listItem.appendChild(user);
    listItem.appendChild(itemActions);

    // Append the list item to the cart list
    cartList.appendChild(listItem);
    //endregion
  });
}

displaycartitems();
