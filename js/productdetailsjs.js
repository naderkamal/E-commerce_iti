//
//
//

//region - "GetDa From Homepage"
function dynamicContentDetails(ob) {
  let mainContainer = document.createElement("div");
  mainContainer.id = "containerD";
  document.getElementById("containerProduct").appendChild(mainContainer);

  let imageSectionDiv = document.createElement("div");
  imageSectionDiv.id = "imageSection";

  let imgTag = document.createElement("img");

  // Check if the photo is a link or a local path
  if (ob.photos.startsWith("http") || ob.photos.startsWith("www")) {
    // Assuming it's a link
    imgTag.src = ob.photos;
  } else {
    imgTag.src = "./images/" + ob.photos;
  }

  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.id = "productDetails";

  let h1 = document.createElement("h1");
  let h1Text = document.createTextNode(ob.name);
  h1.appendChild(h1Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);
  console.log(h4);

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3DetailsDiv = document.createElement("h3");
  let h3DetailsText = document.createTextNode("$ " + ob.price);
  h3DetailsDiv.appendChild(h3DetailsText);

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode("Description");
  h3.appendChild(h3Text);

  let para = document.createElement("p");
  let paraText = document.createTextNode(ob.description);
  para.appendChild(paraText);

  let buttonDiv = document.createElement("div");
  buttonDiv.id = "button";
  //endregion

  //region - "Add To Cart and Add To All Products Page"
  let buttonTag = document.createElement("button");
  buttonTag.id = "buybutton";
  buttonDiv.appendChild(buttonTag);
  // add to cart using local storage
  let buttonText = document.createTextNode("Add to Cart");
  buttonTag.appendChild(buttonText);
  // region- PopUp To Login Meesage
  function showModal(message, link) {
    var modal = document.getElementById("myModal");
    var modalContent = document.querySelector(".modal-content p");

    // Use innerHTML to include HTML tags like <a>
    modalContent.innerHTML = message + ' <a href="' + link + '" target="_blank">Click here</a>.';

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    };

    modal.style.display = "block";
  }

  //endregion

  buttonTag.onclick = function () {
    var userEmail = localStorage.getItem("userEmail");
    // Add condition to check if userEmail is null
    if (userEmail === null) {
      showModal("Please log in or provide an email address.", "./Validation Login and Sign-In/Login/Login.html");
      return;
    }
    else{
      showModal("Added To Your Cart Thanx for your Shopping","./Home.html")
    }
    ob.UserEmail = userEmail;
    ob.ConfirmEmail = false;
    var data_object = JSON.stringify(ob);

    var previous_data = JSON.parse(localStorage.getItem("cartitems")) || [];
    var isProductInWishlist = previous_data.some(
      (item) =>
        item.type === ob.type &&
        item.name === ob.name &&
        item.photos === ob.photos &&
        item.description === ob.description &&
        item.brand === ob.brand &&
        item.price === ob.price &&
        item.UserEmail === ob.UserEmail &&
        item.ConfirmEmail === ob.ConfirmEmail
    );
    if (!isProductInWishlist) {
      var product_wish = [...previous_data, JSON.parse(data_object)];
      localStorage.setItem("cartitems", JSON.stringify(product_wish));
    }
    // =================== Add to Allproduct =============================
    var previous2_data = JSON.parse(localStorage.getItem("AllProducts")) || [];
    var isProductInWishlist2 = previous2_data.some(
      (item) =>
        item.type === ob.type &&
        item.name === ob.name &&
        item.photos === ob.photos &&
        item.description === ob.description &&
        item.brand === ob.brand &&
        item.price === ob.price &&
        item.UserEmail === ob.UserEmail &&
        item.ConfirmEmail === ob.ConfirmEmail
    );
    if (!isProductInWishlist2) {
      var product_wish2 = [...previous2_data, JSON.parse(data_object)];
      localStorage.setItem("AllProducts", JSON.stringify(product_wish2));
    }
  };
  //endregion

  //region - " Add to Wish List Using Local Storage"
  //
  //
  let buttonTagw = document.createElement("button");
  buttonTagw.id = "wishbutton";
  buttonDiv.appendChild(buttonTagw);

  let buttonTextw = document.createTextNode("Add to wish list");
  buttonTagw.appendChild(buttonTextw);
  buttonTagw.onclick = function () {
    var userEmail = localStorage.getItem("userEmail");
    ob.UserEmail = userEmail;
    ob.ConfirmEmail = false;

    var data_object = JSON.stringify(ob);
    var previous_data = JSON.parse(localStorage.getItem("wishlist")) || [];
    var isProductInWishlist = previous_data.some(
      (item) =>
        item.type === ob.type &&
        item.name === ob.name &&
        item.photos === ob.photos &&
        item.description === ob.description &&
        item.brand === ob.brand &&
        item.price === ob.price &&
        item.UserEmail === ob.UserEmail &&
        item.ConfirmEmail === ob.ConfirmEmail
    );
    if (!isProductInWishlist) {
      var product_wish = [...previous_data, JSON.parse(data_object)];
      localStorage.setItem("wishlist", JSON.stringify(product_wish));
    }
  };

  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  detailsDiv.appendChild(buttonDiv);
  return mainContainer;
}
//endregion

let id = location.search.split("?")[1];
function getproductDetails(params) {
  var storedArrayString = localStorage.getItem("myProducts");
  if (storedArrayString !== null) {
    var myArray = JSON.parse(storedArrayString);
  }
  for (let index = 0; index < myArray.length; index++) {
    if (index == id) {
      dynamicContentDetails(myArray[index]);
    }
  }
}
getproductDetails();
