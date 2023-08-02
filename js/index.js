let name = document.getElementById("name");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let description = document.getElementById("description");
let add = document.getElementById("add");
let clear = document.getElementById("clear");
let deleteAll = document.getElementById("btnDeleteAll");
let mood = "create";
let updateTmp;

//get Total
function getTotal() {
  if (price.value != "") {
    let results = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = results;
    total.classList.remove("bg-danger");
    total.classList.add("bg-success");
  } else {
    total.innerHTML = "0";
    total.classList.remove("bg-success");
    total.classList.add("bg-danger");
  }
}

//clear form
function clearForm() {
  name.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  description.value = "";

  count.classList.remove("d-none");
  add.innerHTML = "Add Product";

  getTotal();
  mood = "create";
}

//check product container
let productsContainer;
if (localStorage.products != null) {
  productsContainer = JSON.parse(localStorage.products);
} else {
  productsContainer = [];
}

//create Product and (count and update)

add.onclick = function create() {
  if (validateProductName()){
  let product = {
    name: name.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    description: description.value,
  };
  //Mood
  if ( name.value != "" && price.value != "" && category.value != "" ){
    if (mood === "create") {
      //count
      //console.log(mood);
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          productsContainer.push(product);
        }
      } else {
        productsContainer.push(product);
      }
    } else {
      productsContainer[updateTmp] = product;
    }
    clearForm();
  }else{
    alert("Product Name and Price and Category are required");
  }
  name.classList.remove('is-valid');

  //save to local storage
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts();
  getTotal();
 }else {
  alert(
    "Product Name must be start with upper case and contain from 3 to 8 letters");
}
};


displayProducts();
//display products
function displayProducts() {
  let cartoona = ``;
  for (let i = 0; i < productsContainer.length; i++) {
    cartoona += `
        <tr>
            <td>${i} </td>
            <td>${productsContainer[i].name} </td>
            <td>${productsContainer[i].price} </td>
            <td>${productsContainer[i].taxes} </td>
            <td>${productsContainer[i].ads} </td>
            <td>${productsContainer[i].discount} </td>
            <td>${productsContainer[i].total} </td>
            <td>${productsContainer[i].category} </td>
            <td>${productsContainer[i].description} </td>
            <td><button onclick="deleteProduct('${i}');" class="btn btn-sm btn-outline-danger">Delete</button> </td>
            <td><button onclick="UpdateProduct('${i}');" class="btn btn-sm btn-outline-warning ">Update</button> </td>
        </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;

  if (productsContainer.length != 0) {
    deleteAll.classList.remove("d-none");
    deleteAll.innerHTML = `Delete All (${productsContainer.length})`;
  } else {
    deleteAll.classList.add("d-none");
  }
}

//delete product
function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
}

//Delete All
deleteAll.onclick = function deleteAll() {
  localStorage.clear();
  productsContainer = [];
  displayProducts();
};

//update product
function UpdateProduct(index) {
  name.value = productsContainer[index].name;
  price.value = productsContainer[index].price;
  taxes.value = productsContainer[index].taxes;
  ads.value = productsContainer[index].ads;
  discount.value = productsContainer[index].discount;
  category.value = productsContainer[index].category;
  description.value = productsContainer[index].description;
  getTotal();

  updateTmp = index;
  count.classList.add("d-none");
  add.innerHTML = "Update Product";

  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search Mood
let searchMood = "name";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchName") {
    searchMood = "name";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search by ${searchMood}`;

  search.focus();
  search.value = "";
  displayProducts();
}


// search by name or Category
function searchData(value){
  //console.log(value);
  let cartoona = ``;
  for (let i=0 ; i < productsContainer.length ; i++){
    if (searchMood == "name"){
      if (productsContainer[i].name.toLowerCase().includes(value.toLowerCase())){
        cartoona += `
        <tr>
        <td>${i} </td>
        <td>${productsContainer[i].name} </td>
        <td>${productsContainer[i].price} </td>
        <td>${productsContainer[i].taxes} </td>
        <td>${productsContainer[i].ads} </td>
            <td>${productsContainer[i].discount} </td>
            <td>${productsContainer[i].total} </td>
            <td>${productsContainer[i].category} </td>
            <td>${productsContainer[i].description} </td>
            <td><button onclick="deleteProduct('${i}');" class="btn btn-sm btn-outline-danger">Delete</button> </td>
            <td><button onclick="UpdateProduct('${i}');" class="btn btn-sm btn-outline-warning ">Update</button> </td>
            </tr>`;
          }
        }else{
          if (productsContainer[i].category.toLowerCase().includes(value.toLowerCase())){
            cartoona += `
        <tr>
        <td>${i} </td>
        <td>${productsContainer[i].name} </td>
        <td>${productsContainer[i].price} </td>
            <td>${productsContainer[i].taxes} </td>
            <td>${productsContainer[i].ads} </td>
            <td>${productsContainer[i].discount} </td>
            <td>${productsContainer[i].total} </td>
            <td>${productsContainer[i].category} </td>
            <td>${productsContainer[i].description} </td>
            <td><button onclick="deleteProduct('${i}');" class="btn btn-sm btn-outline-danger">Delete</button> </td>
            <td><button onclick="UpdateProduct('${i}');" class="btn btn-sm btn-outline-warning ">Update</button> </td>
        </tr>`;
      }
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;  
}


//validation
function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;

  if (regex.test(name.value) == true) {
    //console.log("True");
    if(name.classList.contains('is-invalid')){
      name.classList.replace('is-invalid','is-valid');
    }
    return true;
  } else {
    name.classList.add('is-invalid');
    return false;
  }
}
