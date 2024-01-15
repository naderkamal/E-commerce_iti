//region -"Catch Tags"
var productNameInput = document.getElementById("productName");
var productproductType = document.getElementById("productType");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productIMGInput = document.getElementById("productIMG");
var productDescInput = document.getElementById("productDesc");
var mainBtn = document.getElementById("mainBtn");
//endregion

var productsContainer;
if (localStorage.getItem("myProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("myProducts"));
  dispayProducts(productsContainer);
} else {
  productsContainer = [];
}

displayCategories();
//region-AddProduct
function addProduct() {
  if (mainBtn.innerHTML == "Add Product") {
    var product = {
      type: productproductType.value,
      name: productNameInput.value,
      photos: productIMGInput.files[0] ? productIMGInput.files[0].name : "",
      description: productDescInput.value,
      brand: productCategoryInput.value,
      price: productPriceInput.value,
    };
    productsContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    clearForm();
    dispayProducts(productsContainer);
  }
}
//endregion

//region- AddCategory Display in AddProduct
function displayCategories() {
  const categories = JSON.parse(localStorage.getItem("myCategory")) || [];
  // Populate the category dropdown
  var categorySelect = document.getElementById("productType");
  categorySelect.innerHTML = "";
  categories.forEach((category) => {
    var option = document.createElement("option");
    option.text = category.CategoryName;
    categorySelect.add(option);
  });
}
//endregion

//region-Update Category List
function updateCategoryList(newCategory) {
  const existingCategories = JSON.parse(localStorage.getItem("myCategory")) || [];
  if (!existingCategories.includes(newCategory)) {
    existingCategories.push(newCategory);
    localStorage.setItem("myCategory", JSON.stringify(existingCategories));
  }
}
//endregion

//region-Display Product
function dispayProducts(productLiest) {
  var cartoona = "";

  for (var i = 0; i < productLiest.length; i++) {
    cartoona += `<tr>
        <td id ="test"> ${i + 1}</td>
        <td> ${productLiest[i].name}</td>
        <td> ${productLiest[i].price}</td>
        <td> ${productLiest[i].type}</td>
        <td> ${productLiest[i].brand}</td>
        <td>
        <img style="height: 50px; width: 50px;" src="${
          productLiest[i].photos &&
          (productLiest[i].photos.startsWith("http") ? productLiest[i].photos : "images/" + productLiest[i].photos)
        }" alt="">
</td>

        <td> ${productLiest[i].description}</td>
        <td> <button onclick="setForm(${i})" class="btn btn-warning">update</button></td>
        <td> <button onclick="deleteProduct(${i})" class= "btn btn-danger">delete</button></td>
    
        </tr>
        `;
  }
  document.getElementById("tableRow").innerHTML = cartoona;
}
//endregion

function clearForm() {
  productproductType.value = "";
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
  productIMGInput.value = "";
}

function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  dispayProducts(productsContainer);
}

function searchProducts(term) {
  debugger;
  var searchProducts = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchProducts.push(productsContainer[i]);
    }
  }
  dispayProducts(searchProducts);
}

function setForm(productIndex) {
  productNameInput.value = productsContainer[productIndex].name;
  productproductType.value = productsContainer[productIndex].type;
  productPriceInput.value = productsContainer[productIndex].price;
  productIMGInput.textContent = productsContainer[productIndex].photos;
  productCategoryInput.value = productsContainer[productIndex].brand;
  productDescInput.value = productsContainer[productIndex].description;
  mainBtn.innerHTML = "update product";
  document.getElementById("mainBtn").setAttribute("onclick", `updateProduct(${productIndex})`);
}

function updateProduct(productIndex) {
  productsContainer[productIndex].name = productNameInput.value;
  productsContainer[productIndex].price = productPriceInput.value;
  productsContainer[productIndex].photos = productIMGInput.value;
  productsContainer[productIndex].brand = productCategoryInput.value;
  productsContainer[productIndex].description = productDescInput.value;
  productsContainer[productIndex].type = productproductType.value;

  dispayProducts(productsContainer);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  mainBtn.innerHTML = "Add Product";
  document.getElementById("mainBtn").setAttribute("onclick", `addProduct()`);
  clearForm();
  location.reload();
}
