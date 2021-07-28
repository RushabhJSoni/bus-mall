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

let currentProduct1 = null;
let currentProduct2 = null;
let currentProduct3 = null;


//-------------------constructor function-------------//
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;
  this.views = 0;

  Product.allProducts.push(this);

}

Product.allProducts = [];

//---------------prototype----//

Product.prototype.renderProduct = function (img, h2) {
  img.src = this.imgPath;
  h2.textContent = this.name;
  this.views++;
}


//----------------standard global functions----------------//
function getThreeProducts(){
  const doNotRepeat = [currentProduct1,currentProduct2,currentProduct3];
  while(doNotRepeat.includes(currentProduct1)) {
    let product1Index = Math.floor(Math.random() * Product.allProducts.length);
    currentProduct1 = Product.allProducts[product1Index];
  }
  doNotRepeat.push(currentProduct1);

  while(doNotRepeat.includes(currentProduct2)) {
    let product2Index = Math.floor(Math.random() * Product.allProducts.length);
    currentProduct2 = Product.allProducts[product2Index];
  }
  doNotRepeat.push(currentProduct2);

  while(doNotRepeat.includes(currentProduct3)) {
    let product3Index = Math.floor(Math.random() * Product.allProducts.length);
    currentProduct3 = Product.allProducts[product3Index];
  }

  doNotRepeat.push(currentProduct3);
}


function renderAllProducts(){
  currentProduct1.renderProduct(firstProductImg, firstProductH2);
  currentProduct2.renderProduct(secondProductImg, secondProductH2);
  currentProduct3.renderProduct(thirdProductImg, thirdProductH2);
}

function renderResults() {
  ulElem.textContent = '';

  for(let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    ulElem.appendChild(liElem)
  }

}

function productGraph() {
  const ctx = document.getElementById('graph').getContext('2d');

  let productName = [];
  let productVotes = [];
  
  for( let product of Product.allProducts) {
    productName.push(product.name);
    productVotes.push(product.votes);
  }

const labelColors = ['red'];

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: labelColors,
      datasets: [{
          label: '# of Votes',
          data: productVotes,
          backgroundColor: labelColors,
          borderColor: [
              'rgba(255, 99, 132, 1)'
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});
}

//------------listner---------------//
function handleClick(e) {
  let imgClick = e.target.id;
  if(imgClick === 'product1' || imgClick === 'product2' || imgClick === 'product3'){
    noOfClicks++;
  }
  if(imgClick === 'product1'){
    currentProduct1.votes++;
    console.log(currentProduct2)
  }
  if(imgClick === 'product2'){
    currentProduct2.votes++;
    console.log(currentProduct2)
  }
  if(imgClick === 'product3'){
    currentProduct3.votes++;
    console.log(currentProduct3)
  }
  getThreeProducts();
  renderAllProducts();


if(noOfClicks === 10) {
  resultSectionElem.removeEventListener('click', handleClick);
  renderResults();
  productGraph();
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
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('water-can', './img/water-can.jpg');

getThreeProducts();
renderAllProducts();


// const data = [1, 2, 3, 4, 5, 6];


