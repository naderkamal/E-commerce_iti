//region - "Catch IDs"
var CategoryNameInput = document.getElementById("CategoryName");
var CategoryDescInput = document.getElementById("CategoryDesc");
var mainBtn = document.getElementById("mainBtn");
//endregion

var CategoryContainer;
if (localStorage.getItem("myCategory") != null) {
  CategoryContainer = JSON.parse(localStorage.getItem("myCategory"));
  dispayProducts(CategoryContainer);
} else CategoryContainer = [];

function addProduct() {
  debugger;
  if (mainBtn.innerHTML == "add Category") {
    var product = {
      CategoryName: CategoryNameInput.value,
      desc: CategoryDescInput.value,
    };
    CategoryContainer.push(product);
    localStorage.setItem("myCategory", JSON.stringify(CategoryContainer));
    console.log(CategoryContainer);
    clearForm();
    dispayProducts(CategoryContainer);
  }
}

function dispayProducts(productLiest) {
  var cartoona = "";

  for (var i = 0; i < productLiest.length; i++) {
    cartoona += `<tr>
        <td id ="test"> ${i + 1}</td>
        <td> ${productLiest[i].CategoryName}</td>
        
        <td> ${productLiest[i].desc}</td>
        <td> <button onclick="setForm(${i})" class="btn btn-warning">update</button></td>
        <td> <button onclick="deleteProduct(${i})" class= "btn btn-danger">delete</button></td>
    
        </tr>
        `;
  }
  document.getElementById("tableRow").innerHTML = cartoona;
}

function clearForm() {
  CategoryNameInput.value = "";
  CategoryDescInput.value = "";
}

function deleteProduct(productIndex) {
  CategoryContainer.splice(productIndex, 1);
  localStorage.setItem("myCategory", JSON.stringify(CategoryContainer));
  dispayProducts(CategoryContainer);
}

function searchProducts(term) {
  var searchProducts = [];
  for (var i = 0; i < CategoryContainer.length; i++) {
    if (CategoryContainer[i].CategoryName.toLowerCase().includes(term.toLowerCase())) {
      searchProducts.push(CategoryContainer[i]);
    }
  }
  dispayProducts(searchProducts);
}

function setForm(productIndex) {
  CategoryNameInput.value = CategoryContainer[productIndex].CategoryName;
  CategoryDescInput.value = CategoryContainer[productIndex].desc;
  mainBtn.innerHTML = "update Category";
  document.getElementById("mainBtn").setAttribute("onclick", `updateProduct(${productIndex})`);
}

function updateProduct(productIndex) {
  CategoryContainer[productIndex].CategoryName = CategoryNameInput.value;
  CategoryContainer[productIndex].desc = CategoryDescInput.value;

  dispayProducts(CategoryContainer);
  localStorage.setItem("myCategory", JSON.stringify(CategoryContainer));
  mainBtn.innerHTML = "add Category";
  document.getElementById("mainBtn").setAttribute("onclick", `addProduct()`);
  clearForm();
  location.reload();
}
