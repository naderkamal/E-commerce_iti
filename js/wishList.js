// Retrieve the user's email from local storage
var userEmail = localStorage.getItem("userEmail");
debugger;

// Retrieve wishlist items from local storage
var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Filter wishlist items based on the user's email
var userCartItems = wishlist.filter(function (item) {
  return item.UserEmail === userEmail;
});

// Display the filtered items
displayCartItems(userCartItems);

function checkArray() {
  var contentCart = document.getElementById("contentCart");
  var cart = document.getElementById("cart");

  if (wishlist.length === 0) {
    contentCart.style.display = "block";
    cart.style.display = "none";
  } else {
    contentCart.style.display = "none";
    cart.style.display = "block";
  }
}

function displayCartItems(items) {
  var cartList = document.getElementById("cart-items");
  var cartTotal = document.getElementById("cart-total");
  var cartConfirm = document.getElementById("cart-confirm");

  cartList.innerHTML = "";

  // Loop through each item in the cart
  items.forEach((item) => {
    // Create HTML elements for the item
    var itemImage = document.createElement("img");
    var itemName = document.createElement("span");
    var itemPrice = document.createElement("span");
    var listItem = document.createElement("li");
    var itemInfo = document.createElement("div");
    var itemActions = document.createElement("div");
    var deleteButton = document.createElement("button");

    if (item.photos.startsWith("http") || item.photos.startsWith("www")) {
      itemImage.src = item.photos;
    } else {
      itemImage.src = "./images/" + item.photos;
    }

    itemName.textContent = item.name;
    itemPrice.textContent = item.price;
    deleteButton.textContent = "X";

    // Add classes to the HTML elements
    itemInfo.classList.add("item-info");
    itemName.classList.add("item-name");
    itemPrice.classList.add("item-price");
    itemActions.classList.add("item-actions");

    // Add event listeners for the delete button
    deleteButton.addEventListener("click", () => {
      var index = wishlist.indexOf(item);
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      location.reload();
      displayCartItems(userCartItems);
      updateCartTotal();
    });

    // Append the HTML elements to the list item
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemPrice);
    itemActions.appendChild(deleteButton);
    listItem.appendChild(itemImage);
    listItem.appendChild(itemInfo);
    listItem.appendChild(itemActions);

    // Append the list item to the cart list
    cartList.appendChild(listItem);
  });
}
checkArray();
