$(document).ready(function(){
	//pass array of character attributes to Game object to populate Game.characters
	var characters = [["4LOM",140,20,45,"assets/images/4LOM.jpg"],["IG_88",145,20,50,"assets/images/IG88.jpg"],["Salacious_B_Crumb",55,5,15,"assets/images/scrumb.jpg"],["Rancor",450,85,125,"assets/images/rancor.jpg"]];
	
	//create new Game
	var thisGame = new Game(characters);
	
	//click on character image to select player, and again to choose opponent
	$(".charImage").on("click", choosePlayer);


	function choosePlayer(){
		console.log(this.id);
		if(thisGame.player == undefined){
			thisGame.player = this.id;
			console.log('thisGame.player', thisGame.player);
		}else if(thisGame.currentOpponent == undefined && this.id != thisGame.player){
			thisGame.currentOpponent = this.id;
		}
		console.log('thisGame.player', thisGame.player);
		console.log('thisGame.currentOpponent', thisGame.currentOpponent);
	}
	
	//Game invokes this constructor to create Character objects which are stored in Game.characters object
	function Character(name, hp, attackPower, counterAttackPower, image = null) {
		this.name = name;
		this.hp = hp;
		this.ap = attackPower;
		this.cp = counterAttackPower;
		this.image = image;
		this.attack = function(defender){
			if (this.name)
			console.log(this.name + " attacks " + defender.name + " for " + this.ap + " points of damage!");
			defender.hp -= this.ap;
			console.log('defender.hp = ', defender.hp);

		}
	}

	function Game(characterArray) {
		this.player;
		this.currentOpponent;
		this.characters = {};

		this.createCharacter = function(name, hp, attackPower, counterAttackPower){
			var newChar = new Character(name, hp, attackPower, counterAttackPower);
			this.characters[name] = newChar;
			return;
		}
		var c = characterArray;
		for(char in c) {
			this.createCharacter(c[char][0],c[char][1],c[char][2],c[char][3],c[char][4]);
			var charName = c[char][0];
			var idStr = "<div id='" + charName + "' class='charImage' alt='" + charName + "'>";
			var img = c[char][4];
			var imgStr = "<img src='" + img + "' height='250px'>";
			$(".charSelect").append("<div " + idStr + "</div>");
			if (img != null){
				$("#"+charName).append(imgStr);
			}
		}


	}




	//




	console.log(thisGame.characters);




	thisGame.characters["IG_88"].attack(thisGame.characters["4LOM"]);
	thisGame.characters["IG_88"].attack(thisGame.characters["4LOM"]);
	thisGame.characters["IG_88"].attack(thisGame.characters["4LOM"]);
	console.log(thisGame);
	
});