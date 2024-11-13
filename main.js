/** List Categories
 * API request
 * Bring data
 * */

const categoryList = document.querySelector("#category-list");
const productsList = document.getElementById("products");
const openButton = document.querySelector("#open-button");
const closeButton = document.querySelector("#close-button");
const modal = document.getElementById("modal");
const modalList = document.querySelector(".modal-list");
const totalPrice = document.getElementById("total-price");

function fetchCategories() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.slice(0, 5).map((categoryy) => {
        const { category, image } = categoryy;
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `    <img
            src=${image}    alt=""
          />
          <span>${category}</span>`;

        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((error) => console.log(error));
}

function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.map((product) => {
        const { title, price, category, image, id } = product;
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <img src=${image} alt="">
        <p>${title}</p>
        <p>${category}</p>
        <div class="product-action">
          <p>${price} CAD</p>
          <button onclick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1})">Add to Basket</button>
        
        </div>
        `;
        productsList.appendChild(productDiv);
        //  console.log(productDiv)
      })
    )
    .catch((error) => console.log("api hatası", error));
}

fetchProducts();

let basket = [];
let total=0;
//Add to Cart Procedures

function addToBasket(product) {
  const sameId = basket.find((x) => x.id === product.id);

  if (sameId) {
    sameId.amount++;
  } else {
    basket.push(product);
  }
}

function showBasketItems() {
  basket.map((x) => {
    const listItem = document.createElement("div");

    listItem.classList.add("list-item");

    const { image, title, price, amount, id } =x;

    listItem.innerHTML = `

    <img
    src=${image}
    alt=""
    />
    <h4>${title}</h4>
    <h4 class="price">${price}₺</h4>
    <p>Amount: ${amount}</p>
    <button class="delete-button" onclick='deleteItem({id:${id},price:${price},amount:${amount}})' >Delete</button>
    `;

    modalList.appendChild(listItem);

    // console.log(listItem);

    total += price * amount;
  });
}

//Cart Opening and Closing Operations
openButton.addEventListener("click", () => {
  showBasketItems();
  modal.classList.add("active");
  totalPrice.innerText=total;
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("active");
  modalList.innerHTML='';
  total=0;
});

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
  }
});

//Cart Delete Operations

function deleteItem(willDeleteItem){

 basket=basket.filter((x)=>x.id!==willDeleteItem.id)

 total-=willDeleteItem.price*willDeleteItem.amount
 totalPrice.innerText=total;


}

modal.addEventListener('click',(clickInformation)=>{
  if(clickInformation.target.classList.contains('delete-button')){
    clickInformation.target.parentElement.remove()
  }

  if(basket.length===0){
    modal.classList.remove('active');
  }

})
