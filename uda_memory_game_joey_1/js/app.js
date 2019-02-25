let restart = document.querySelector('.restart');
restart.onclick  = function(){
  initGame();
  reset();
}
/*
 * Create a list that holds all of your cards
 */
let cardsNames = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

let moves = document.querySelector('.moves');
let movesCounter = moves.textContent;

function generateHTML(card){
    return `<li class="card"><i class="fa ${card}"></i></li>`;
}


function initGame(){
//Shuffle the cards
   cardsNames = shuffle(cardsNames);
   console.log(cardsNames);
//generate cards
   let cardsHTML = [];
   for(let cardName of cardsNames){
     let newList = generateHTML(cardName);
     cardsHTML.push(newList);
     }
   let cardsHTMLTemp = cardsHTML.join("");
   let deck = document.querySelector('.deck');
   deck.innerHTML= '';
   deck.insertAdjacentHTML('afterbegin', cardsHTMLTemp);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

initGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let allCards = document.querySelectorAll('.card');
let openCards = [];

for (let card of allCards){
    card.addEventListener('click', function(){
    console.log('run click');


    //disabled the open and matched card
    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){

      //Show maximal two cards at at a time
      cardShow(card);
      openCards.push(card);
      if(openCards.length <= 2){

        //counting valid moves
        movesCount();
        console.log(movesCounter);

        //if two cards with .show matched
        let firstCard = openCards[0];
        let secondCard = openCards[1];
        let firstCardName = firstCard.querySelector('i').classList.item(1);
        let secondCardName = secondCard.querySelector('i').classList.item(1);


        if (firstCardName === secondCardName){
          firstCard.classList.replace('show','match');
          secondCard.classList.replace('show','match');
          openCards = [];
        } else {
          // two cards not matched and then hide
          setTimeout(function(){
            for (let openCard of openCards){
              cardHide(openCard);
            }
            openCards = [];
          }, 1000);
        }
      } else {
          cardHide(card);
      }
    }

    //is all cards matched
    isAlllMatched(card);
  })
}

function isAlllMatched(card){
let numMatched = 0;
 for(let cards of allCards){
   //if all cards are matched
   if(cards.classList.contains('match')){
     numMatched ++;}
   }
   console.log('number of mached cards ' + numMatched);
   if(numMatched === 16){
     setTimeout(function(){document.body.innerHTML = `<div class="win"><h1>Congrats, you just won the game in ${movesCounter} moves.</h1><p>/reflesh the page to restart/</p></div>`;},500);

 }
}



function cardShow(card){
  card.classList.add('open','show');
}

function cardHide(card){
  card.classList.remove('open','show');
}


let star = document.querySelectorAll('.stars > li');

function movesCount(){
  movesCounter ++;
  moves.textContent = movesCounter;
  //rating with starts, test rating value
  if(movesCounter > 20 && movesCounter <= 30){
    star.item(0).remove();
  } else if (movesCounter > 30 && movesCounter <= 40){
    star.item(1).remove();
  } else if (movesCounter > 40){
    star.item(2).remove();
  }
}

let sec = document.querySelector('#sec');
let min = document.querySelector('#min');
let hour = document.querySelector('#hour');

window.onload = function(){

}

let timer = setInterval(function(){
  sec.innerText ++;
  if(sec.innerText >60){
    min.innerText ++;
    sec.innerText= 0;
    }
  if(min.innerText >60){
    hour.innerText ++;
    min.innerText= 0;
    }
  } , 1000);



function reset(){
  //step moves to 0
    movesCounter = 0;
    moves.textContent = movesCounter;

    //empty the open cards
    openCards = [];

    //rating
    document.querySelector('.stars').innerHTML = '';
    document.querySelector('.stars').insertAdjacentHTML('afterbegin','<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');

    clearInterval(timer);
    sec.innerText= 0;
    min.innerText= 0;
    hour.innerText= 0;
}
