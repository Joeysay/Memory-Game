
/*
 * Create a list that holds all of your cards
 */
let cardsNames = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

let moves = document.querySelector('.moves');
let movesCounter = moves.textContent;

function generateHTML(card){
    return `<li class="card" id="${card}" ><i class="fa ${card}"></i></li>`;
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

let restart = document.querySelector('.restart');
restart.onclick  = function(){
  initGame();
  reset();
}


let allCards = document.querySelectorAll('.card');
let openCards = [];


function cardOnClick(){
  for (let card of allCards){
      card.addEventListener('click', function(){

      //disabled the open and matched card
      if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){

        //Show maximal two cards at at a time
        cardShow(card);

        if(openCards.length <=0 ){
          openCards.push(card);
          movesCount();
        }else if(openCards.length <=1 && openCards.length>0){
          //counting valid moves
          openCards.push(card);
          movesCount();
          if (openCards[0].id === openCards[1].id){
            openCards[0].classList.replace('show','match');
            openCards[1].classList.replace('show','match');
            openCards = [];
          } else {
            // two cards not matched and then hide
            setTimeout(function(){
              for (let openCard of openCards){
                cardHide(openCard);
              }
              openCards = [];
            }, 800);
          }
        } else {
            cardHide(card);
        }
      }

      //is all cards matched
      isAlllMatched(card);
    })
  }

}

cardOnClick();




function cardShow(card){
  card.classList.add('open','show');
}

function cardHide(card){
  card.classList.remove('open','show');
}


//rating
let star = document.querySelectorAll('.stars > li');
let currentRate = document.querySelector('.stars').innerHTML;

function movesCount(){
  movesCounter ++;
  console.log(movesCounter);
  moves.textContent = Math.floor(movesCounter/2);
  //rating with starts, test rating value
  if(movesCounter > 4 && movesCounter <= 8){
    star.item(0).remove();
  } else if(movesCounter > 8) {
    star.item(1).remove();
  }
  currentRate = document.querySelector('.stars').innerHTML ;

}

//Timer
let sec = document.querySelector('#sec');
let min = document.querySelector('#min');
let hour = document.querySelector('#hour');

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


function isAlllMatched(card){
  let numMatched = 0;
   for(let cards of allCards){
     //if all cards are matched
     if(cards.classList.contains('match')){
       numMatched ++;}
     }
     console.log('number of mached cards ' + numMatched);
     if(numMatched === 2){
       setTimeout(function(){document.body.innerHTML = `<div class="win"><h1>Congrats, you just won the game!</h1><h3>with ${movesCounter} moves ${currentRate} </br> ${hour.innerText}h${min.innerText}min${sec.innerText}sec</h3><button class="reload">Play again</button></div>`;
       let reload = document.querySelector('.reload');
       console.log(reload);
       reload.onclick  = function(){
         location.reload(true);
       }
     },500);


   }


}



function reset(){
  //step moves to 0
    movesCounter = 0;
    moves.textContent = movesCounter;

    //empty the open cards
    allCards = document.querySelectorAll('.card');
    openCards = [];

    //rating
    document.querySelector('.stars').innerHTML = '';
    document.querySelector('.stars').insertAdjacentHTML('afterbegin','<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
    star = document.querySelectorAll('.stars > li');

    //timer
    //clearInterval(timer);
    sec.innerText= 0;
    min.innerText= 0;
    hour.innerText= 0;

    cardOnClick();
}
