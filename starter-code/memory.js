var lastPickCardid = 100;
var actualCardId= 100;
var secondCard = false;
var MemoryGame = function() {
  this.Cards = [
  		{ name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
  		{ name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
      { name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
      { name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
      { name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
  		{ name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
  	];
  this.picked_cards  = [];
  this.pairs_clicked = 0;
  this.pairs_guessed = 0;
  this._shuffleCard();
};
// this function just takes the array of cards above and shuffles them into a random order
MemoryGame.prototype._shuffleCard = function() {
  var counter = this.Cards.length;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = this.Cards[counter];
    this.Cards[counter] = this.Cards[index];
    this.Cards[index] = temp;
  }
  return;
};

MemoryGame.prototype.selectCard = function(card) {
  console.log("Entro a carta seleccionada");
  if(secondCard){
    console.log("Entro a segunda carta");
    var previousCard =  this.Cards[lastPickCardid];
    var cardName1 =  previousCard.name;
    var cardName2 = card.name;

    console.log(cardName1);
    console.log(cardName2);

    if(cardName1 === cardName2){
      console.log("tienen mismo nombre");
      this.picked_cards.push(card);
      this.pairs_guessed++;
      this.updateScore(this.pairs_guessed, this.pairs_clicked);
      console.log(this.picked_cards);
    }
    else{
      console.log("entro a metodo de voltear");
      var that =this;
    setTimeout(function () {
      console.log(that);
        that.switchBackCards(card);
        that.switchBackCards(previousCard);

      }, 1000);
      this.pairs_clicked++;
    }
    lastPickCardid = 100;
    actualCardId = 100;
    secondCard= false;

  }else {
    secondCard = true;
    lastPickCardid = actualCardId;
  }
  this.updateScore(this.pairs_guessed, this.pairs_clicked);
};

MemoryGame.prototype.updateScore = function(cardsGuessed, cardsClicked) {
	$("#pairs-guessed").text(cardsGuessed);
	$("#pairs-clicked").text(cardsClicked);
};

MemoryGame.prototype.switchBackCards = function(card) {
  console.log("Metodo Voltear");
  var index = this.Cards.indexOf(card);
  $("#"+index).children().toggle();
};


MemoryGame.prototype.checkIfExist = function(name) {
  var isIt = false;
  this.picked_cards.forEach(function(card){
    console.log(card["name"])
      if(card["name"] === name){
        isIt= true;

      }
  });
    return isIt;
};

var memoryGame;

$(document).ready(function(){
  memoryGame = new MemoryGame();

//Load all the cards in the game Board.
  memoryGame.Cards.forEach(function (card,index){
    $("#"+index).html(`<img src='img/${card.img}'>`);
  });

//Event Listener to catch de click of the User in the card
  $(".pic").click(function(){
    

    
    var cardId = $(this).attr("id");
    
    var actualCard = memoryGame.Cards[cardId];
    var lookinginArray = memoryGame.picked_cards.indexOf(actualCard);

    var exist = memoryGame.checkIfExist(actualCard["name"]);
    console.log(exist);
    //Modificar que no clicke donde ya se descubrieron.
    if(lookinginArray == -1 && lastPickCardid != cardId && !exist){
      console.log(cardId);
      actualCardId = cardId;
      memoryGame.selectCard(actualCard);
      $(this).children().toggle();
    }



  });

});
