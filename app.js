'use strict'

//------------------global variables--------------//
let noOfClicks = 0;
const ulElem = document.getElementById('result');
const resultSectionElem = document.getElementById("products");
const firstProductImg = document.getElementById('product1');
const secondProductImg = document.getElementById('product2');
const thirdProductImg = document.getElementById('product3');
const firstProductH2 = document.getElementById('product1h2');
const secondProductH2 = document.getElementById('product2h2');
const thirdProductH2 = document.getElementById('product3h2');

let product1 = null;
let product2 = null;
let product3 = null;


//-------------------constructor function-------------//
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];




//---------------prototype----//

Product.prototype.renderProduct = function (img, h2) {
  img.src = this.imgPath;
  h2.textContent = this.name;
}




//----------------standard global functions----------------//
function getThreeProducts(){
  let product1Index = Math.floor(Math.random() * Product.allProducts.length);
  product1  = Product.allProducts[product1Index];
  let product2Index = Math.floor(Math.random() * Product.allProducts.length);
  product2  = Product.allProducts[product2Index];
  let product3Index = Math.floor(Math.random() * Product.allProducts.length);
  product3  = Product.allProducts[product3Index];
  while(product2 === null || product2 === product1 ||product2 === product3){
    product2Index = Math.floor(Math.random() * Product.allProducts.length);
  product2  = Product.allProducts[product2Index];
  }
  while(product3 === null || product3 === product2 ||product3 === product1){
    product3Index = Math.floor(Math.random() * Product.allProducts.length);
  product3  = Product.allProducts[product3Index];
  }
}

function renderAllProducts(){
  product1.renderProduct(firstProductImg, firstProductH2);
  product2.renderProduct(secondProductImg, secondProductH2);
  product3.renderProduct(thirdProductImg, thirdProductH2);
}

function renderResults() {
  ulElem.textContent = '';

  for(let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    ulElem.appendChild(liElem)
  }

}

//------------listner---------------//
function handleClick(e) {
  let imgClick = e.target.id;
  if(imgClick === 'product1' || imgClick === 'product2' || imgClick === 'product3'){
    noOfClicks++;
  }
  if(imgClick === 'product1'){
    product1.votes++;
    console.log(product1)
  }
  if(imgClick === 'product2'){
    product2.votes++;
    console.log(product2)
  }
  if(imgClick === 'product3'){
    product3.votes++;
    console.log(product3)
  }
  getThreeProducts();
  renderAllProducts();


if(noOfClicks === 10) {
  renderResults();
  resultSectionElem.removeEventListener('click', handleClick);
}
}

resultSectionElem.addEventListener('click', handleClick);




//--------------call functions------------//

new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.jpg');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('water-can', './img/water-can.jpg');

getThreeProducts();
renderAllProducts();
