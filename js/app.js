// ১২. আমাদের গিটহাব এ যাও। সেখানে ranga-store নামে একটা রিপোজটিরি আছে। সেটা ক্লোন করো। 

// ১৩. সেখানেও কী কী বাগ আছে। তুমি নিজেই খুঁজে বের করার চেষ্টা করো। মিনিমাম তিনটা বাগ খুঁজে বের করে সেগুলা ফিক্স করার চেষ্টা করো। 
const loadProducts = () => {

  const inputField = document.getElementById('input-field')
  const text = inputField.value;


     const url=`https://fakestoreapi.com/products/category/${text}`
     fetch(url)
    .then(res => res.json())
    .then(data => showProducts(data))
  inputField.value = '';
};
// show all product in UI 
const showProducts = (products) => {

  for (const product of products) {


    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
      <button id="details-btn" onclick="singleCardData(${product.id})" class="btn btn-info">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const singleCardData = id => {
  //console.log(id);
  const url = `https://fakestoreapi.com/products/${id}`
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => displaySingleCard(data))
}

const displaySingleCard = product => {
  const parent = document.getElementById('parent');
  parent.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card')
  div.innerHTML = `
     <div class="row p-5 d-flex justify-content-center align-items-center">
     <div class="col-md-6">
       <img class="image" src="${product.image}" alt="">
     </div>
     
      <div class="col-md-6">
        <h3>Title:${product.title}</h3>
        <h4>Category:${product.category}</h4>
         <h5>Rating:${product.rating.rate}</h5>
          <p>Description:${product.description.slice(0, 100)}</p>
      </div>
      </div>
     `
  parent.appendChild(div)
}
let count = 0;
const addToCart = price => {
  console.log(price);
  count = count + 1;
  document.getElementById("total-Products").innerText = count;
  updatePrice("price", price);
  updateTotal();
  updateTaxAndCharge();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = Math.round((convertedOldPrice + convertPrice));
  document.getElementById(id).innerText = total;
  return total;
};

// set innerText function
const setInnerText = (id, value) => {

  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
loadProducts();
