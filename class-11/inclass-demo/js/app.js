'use strict';

console.log('hey there hey!');

// *********** GLOBAL VARIABLES ***********
let votingRounds = 15; // let votingRounds = 0;

let goatArray = [];

// ******* DOM REFERENCES ******************
let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('display-results-list');


// ********* CONSTRUCTOR *******************

function Goat(name, fileExtension = 'jpg'){
  this.goatName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  goatArray.push(this);
}

new Goat('cool-goat');
new Goat('bunny-goat', 'png');
new Goat('cruisin-goat');
new Goat('float-your-goat');
new Goat('goat-out-of-hand');
new Goat('kissing-goat');
new Goat('sassy-goat');
new Goat('smiling-goat');
new Goat('sweater-goat');

console.log(goatArray);

// ********** HELPER FUNCTIONS *************

function getRandomIndex(){
  // got from w3resource.com
  return Math.floor(Math.random()* goatArray.length);
}

function renderImgs(){

  let goatOneIndex = getRandomIndex();
  let goatTwoIndex = getRandomIndex();

  // your lab will need to validate 3 images
  // HINT: you could use a container to store your indexes and do the validation there...
  while(goatOneIndex === goatTwoIndex){
    goatTwoIndex = getRandomIndex();
  }

  imgOne.src = goatArray[goatOneIndex].image;
  imgOne.alt = goatArray[goatOneIndex].goatName;
  goatArray[goatOneIndex].views++;

  imgTwo.src = goatArray[goatTwoIndex].image;
  imgTwo.alt = goatArray[goatTwoIndex].goatName;
  goatArray[goatTwoIndex].views++;

}

renderImgs();

// ********* EVENT HANDLERS ****************
function handleClick(event){

  let imgClicked = event.target.alt;

  for(let i = 0; i < goatArray.length; i++){
    if(imgClicked === goatArray[i].goatName){
      goatArray[i].clicks++;
    }
  }
  // rerender 2 new imgs

  votingRounds--;
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
    return;
  }
  renderImgs();

}


function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < goatArray.length; i++){
      let li = document.createElement('li');

      li.textContent = `${goatArray[i].goatName} was viewed ${goatArray[i].views} times and clicked on ${goatArray[i].clicks} times.`;
      resultsList.appendChild(li);
    }
  }
}

// ******** EVENT LISTENERS ***************
imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
