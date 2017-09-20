$(document).ready(function(){
	//pass array of character attributes to Game object to populate Game.characters
	var characters = [["4LOM",140,20,45,"assets/images/4LOM.png"],["IG-88",145,20,50,"assets/images/IG88edited.png"],["Salacious_B_Crumb",55,5,15,"assets/images/scrumb2.png"],["Rancor",450,85,125,"assets/images/rancorcloseup.png"],["C3PO",90,10,10,"assets/images/C3PO.png"]];
	
	//create new Game
	var thisGame = new Game(characters);
	
	//click on character image to select player, and again to choose opponent
	$(".charImage").on("click", choosePlayer);

	function choosePlayer(){
		console.log(this.id);
		if(thisGame.player == undefined){
			thisGame.player = this.id;
			var playerDiv = $("#"+this.id);
			playerDiv.detach();
			$("#playerCol").append(playerDiv);
			$("#arena").css("display","block");
			console.log('thisGame.player', thisGame.player);
		}else if(thisGame.currentOpponent == undefined && this.id != thisGame.player){
			thisGame.currentOpponent = this.id;
			var opponentDiv = $("#"+this.id);
			opponentDiv.detach();
			$("#opponentCol").append(opponentDiv);
		}
		console.log('thisGame.player', thisGame.player);
		console.log('thisGame.currentOpponent', thisGame.currentOpponent);
		if (thisGame.player != undefined && thisGame.currentOpponent != undefined){
			// $(".charImage").off();
			return thisGame.startGame();
		}
	}
	
	//Game invokes this constructor to create Character objects which are stored in Game.characters object
	function Character(name, hp, attackPower, counterAttackPower, image = null) {
		this.name = name;
		this.hp = hp;
		this.ap = attackPower;
        this.apBase = attackPower;
		this.cp = counterAttackPower;
		this.image = image;
        this.attackPower = this.ap;
		this.attack = function(defender){
            if(this.name != thisGame.player){
                this.attackPower = this.cp;
                this.apBase = 0;
            }
			console.log(this.name + " attacks " + defender.name + " for " + this.attackPower + " points of damage!");
			defender.hp -= this.attackPower;
			console.log('defender.hp = ', defender.hp);
            this.attackPower += this.apBase;        
		}
		
		this.update = function(){
			$("#" + this.name + "-name").html(this.name);
			$("#" + this.name + "-stats").html("HP:" + this.hp);
		}
	
	}
	//Game object
	function Game(characterArray) {
		this.player;
		this.currentOpponent;
		this.characters = {};
		//Game object uses createCharacter function to make new Character objects and store them in Game.characters
		this.createCharacter = function(name, hp, attackPower, counterAttackPower){
			var newChar = new Character(name, hp, attackPower, counterAttackPower);
			this.characters[name] = newChar;
			return;
		}
		//this loop invokes this.createCharacter for each character in the given array, and then creates a <div> for each and populates with the provided image
		var c = characterArray;
		for(char in c) {
			this.createCharacter(c[char][0],c[char][1],c[char][2],c[char][3],c[char][4]);
			var charName = c[char][0];
			var colDiv = $("<div class='col-sm-" + Math.floor(12/c.length) + "'>");
			var idDiv = $("<div id='" + charName + "' class='charImage' alt='" + charName + "'>");
			var img = c[char][4];
			var imgStr = "<img src='" + img + "' height='100px';>";
			$(colDiv).append(idDiv);
			$(".charSelect").append(colDiv);
			if (img != null){
				$("#"+charName).append(imgStr);
			}
			$("#"+charName).append("<div class='charStats' id='" + charName + "-name'>");
			$("#"+charName).append("<div class='charStats' id='" + charName + "-stats'>");
			this.characters[charName].update();
		}
		
		this.startGame = function(){
			console.log("GAME STARTED!");
			$(".attack").html("<button id='attackButton'>ATTACK</button>")
		}
	}

	$(".attack").on("click", function(){
		var player = thisGame.characters[thisGame.player];
		var enemy = thisGame.characters[thisGame.currentOpponent];
		battleRound(player,enemy);
		});
	
	function objectSize(obj){
		var count = 0;
		for (key in obj){
			count++
		}
		return count;
	}
	
	function battleRound(player,enemy){
		player.attack(enemy);
		player.update();
		enemy.update();
		if(enemy.hp < 1){
			printMsg("George has been defeated!");
			console.log(" has been defeated!");
			thisGame.currentOpponent = undefined;
			delete thisGame.characters[enemy.name];
			$("#"+enemy.name).remove();
			$("#attackButton").remove();
 			if(objectSize(thisGame.characters) == 1){
				gameOver("Won!");
			}
		}else{
		
		enemy.attack(player);
		player.update();
		enemy.update();
		if(player.hp < 1){
			printMsg(enemy.name + " has defeated you!");
			$("#attackButton").remove();
			gameOver("Lost!");
		}
		}
	}
		
	function printMsg(msg){
		console.log(msg);
		
		var messageElement = $("p").html(msg);
		$("#messageWindow").append(messageElement);
	}
    function gameOver(winLoseString){
        printMsg("GAME OVER")
		printMsg("You " + winLoseString);
		return;
    }
        

	console.log(thisGame.characters);



//
//	thisGame.characters["IG_88"].attack(thisGame.characters["4LOM"]);
//	thisGame.characters["IG_88"].attack(thisGame.characters["4LOM"]);
//	thisGame.characters["IG_88"].attack(thisGame.characters["4LOM"]);
//	console.log(thisGame);
//	
});