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

  // Product.allProducts.push(this);
  
}

Product.allProducts = [];

//---------------prototype----//

Product.prototype.renderProduct = function (imgPath, h2) {
  debugger;
  imgPath.src = this.imgPath;
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
  // ulElem.textContent = '';

  for(let votes of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${votes.name}: ${votes.votes} votes : ${votes.views} views`;
    ulElem.appendChild(liElem)
  }

}

function productGraph() {
  const ctx = document.getElementById('graph').getContext('2d');

  let productName = [];
  let productVotes = [];
  let productViews = [];
  
  for( let votes of Product.allProducts) {
    productName.push(votes.name);
    productVotes.push(votes.votes);
    productViews.push(votes.views);
  }
}

  // const labelColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  // var myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: labelColors,
  //         datasets: [{
  //             label: '# of Votes',
  //             data: votes.views,
  //             backgroundColor: labelColors,
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //            ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });


function getVotesFromStorage() {
  let votesInStorage = localStorage.getItem('currentVotes');
    if(votesInStorage){
      let parsedVotes = JSON.parse(votesInStorage);
      console.log(parsedVotes);
    for (let votes of parsedVotes) {
      let newVotes = new Product(votes.name,votes.imgPath, votes.vote, votes.view);
      Product.allProducts.push(newVotes);
      console.log(Product.allProducts)
      // newVotes.renderProduct();
    }
   

  }
}

function putVotesInStorage(){
  let storageStringArray = JSON.stringify(Product.allProducts);
  localStorage.setItem('currentVotes', storageStringArray);
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
    putVotesInStorage();
    productGraph();
  }
}

resultSectionElem.addEventListener('click', handleClick);




//--------------call functions------------//


Product.allProducts.push(new Product('bag', './img/bag.jpg'));
Product.allProducts.push(new Product('banana', './img/banana.jpg'));
Product.allProducts.push(new Product('bathroom', './img/bathroom.jpg'));
Product.allProducts.push(new Product('boots', './img/boots.jpg'));
Product.allProducts.push(new Product('breakfast', './img/breakfast.jpg'));
Product.allProducts.push(new Product('bubblegum', './img/bubblegum.jpg'));
Product.allProducts.push(new Product('chair', './img/chair.jpg'));
Product.allProducts.push(new Product('cthulhu', './img/cthulhu.jpg'));
Product.allProducts.push(new Product('dog-duck', './img/dog-duck.jpg'));
Product.allProducts.push(new Product('dragon', './img/dragon.jpg'));
Product.allProducts.push(new Product('pet-sweep', './img/pet-sweep.jpg'));
Product.allProducts.push(new Product('scissors', './img/scissors.jpg'));
Product.allProducts.push(new Product('shark', './img/shark.jpg'));
Product.allProducts.push(new Product('sweep', './img/sweep.png'));
Product.allProducts.push(new Product('tauntaun', './img/tauntaun.jpg'));
Product.allProducts.push(new Product('unicorn', './img/unicorn.jpg'));
Product.allProducts.push(new Product('water-can', './img/water-can.jpg'));






getThreeProducts();
renderAllProducts();
getVotesFromStorage();

