// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      *Fight all enemy-robots
//      *Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
// Function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min) + min);

  return value;
};

// Fight Function that includes the  Enemy's Name
var fightOrSkip = function() {
  //ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
  // Enter the conditional recursive function call here
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    // use return to call it again and stop the rest of this function from running
    return fightOrSkip();
  }
  // Convert promptFight to all lowercase
  promptFight = promptFight.toLowerCase();

  // If player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    //if yes (true), leave fight

    // If yes(or true), they leave the fight
    if (confirmSkip) {
      window.alert(playerInfo,name + " has decided to skip this fight. Goodbye!");
      // If the player decides to skip, this line subtracts money from the player
      playerInfo.money = Math.max(0, playerInfo.money - 10);

      // Returns true if the player wants to leave
      return true;
    }
  }
  return false;
};

// Fight function with parameters
var fight = function(enemy) {
  // Keeps track of which robot attacks first
  var isPlayerTurn = true;

  // Randomly changes turn order of the Robots
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      //Ask player if they would like to keep fighting
      if (fightOrSkip()) {
        //If True, break the loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3,  playerInfo.attack);

      // After the fight subtract the value of the playerAttack variable from the enemy.health
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(playerInfo.name + 
        " attacked " + 
        enemy.name + 
        ". " + 
        enemy.name + 
        " now has " + 
        enemy.health + 
        " health remaining.");

      // Check enemy health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // Award the player money for winning the fight
        playerInfo.money = playerInfo.money + 20;
  
        // Leave the while() loop if the enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // The player that gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      
      // Subtract the value of the enemy.attack variable from the playerHealth
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(enemy.name + 
        " attacked " + 
        playerInfo.name + 
        ". " + 
        playerInfo.name + 
        " now has " + 
        playerInfo.health + 
        " health remaining.");

      // Check player health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // Leave the while() loop if the player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // Switch the turn order for the next round
    isPlayerTurn = !isPlayerTurn;
  } // End of the While Loop
}; // End of the Fight Function

// Function to start a new game
var startGame = function() {
  // Reset player stats
  playerInfo.reset();

  // Fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    
    console.log(playerInfo);
    
    // If the player is still alive, they keeping fighting
    if (playerInfo.health > 0) {
      // Lets the player know what round they are in (They array starts at '0' so it needs to have 1 added to it)
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // Picks a new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      // Set the health for the enemy that is picked
      pickedEnemyObj.health = randomNumber(40, 60);
      console.log(pickedEnemyObj);

      // Pass the pickedenemy.name variable value into the fight function, it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // If the player is still alive and it hasn't gotten to the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // Ask if the player wants to use the store before the next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // If they want to use the store execute store() function
        if (storeConfirm) {
          shop();
        }
      }
    }

    // If the player is dead, the game stops
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }
  // After the loop ends, the robot is either out of playerHealth or enemies to fight
  // so the endGame function is run
    endGame();
  };

// Function that ends the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // Check localStorage for the high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  // If the player has more money than the high score, the player has the new high score
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  }
    else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }
  // Ask the player if they would like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};
// Go to the shop between battle functions
var shop = function() {
  // Ask player what they would like to do
  var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please pick a choice: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

  // Convert the answer from the prompt into an actual number
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // Use switch case to carry out an action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
      // Do nothing and the function ends
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};
/* End of Game Functions */

// Function to set name
var getPlayerName = function() {
  var name = "";
  
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }
  console.log("Your robot's name is " + name);
  return name;
};

// Game Information / Variables
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars");
      this.health += 20;
      this.money -= 7;
    }
      else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
      else {
      window.alert("You don't have enough money!");
    }
  }
};

// EnemyInfo array
var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

/* End of player info code */

// Starts the game when the page loads
startGame();