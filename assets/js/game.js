// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      *Fight all enemy-robots
//      *Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
}

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = randomNumber(40, 60);
var enemyAttack = 12;

// Fight Function that includes the  Enemy's Name
var fight = function(enemyName) {
  while(playerHealth > 0 && enemyHealth > 0) {

    // Asks the player if the would like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // If the player decides to 'skip' they have to confirm and stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {

        // The player confirms that they are skipping
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // If yes(or true), they leave the fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // If the player decides to skip, this line subtracts money from the player
            playerMoney = Math.max(0, playerMoney - 10);
            console.log("playerMoney", playerMoney);
            break;
        }
    }
    // After the fight subtract the value of the playerAttack variable from the enemyHealth
    var damage = randomNumber(playerAttack - 3,  playerAttack);
      enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // Check enemy health
        if (enemyHealth <= 0) {
          window.alert(enemyName + " has died!");
          // Award the player money for winning the fight
          playerMoney = playerMoney + 20;
          // Leave the while() loop if the enemy is dead
          break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of the enemyAttack variable from the playerHealth
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
          playerHealth = Math.max(0, playerHealth - damage);
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // Check player health
            if (playerHealth <= 0) {
              window.alert(playerName + " has died!");
              // Leave the while() loop if the player is dead
              break;
            } else {
              window.alert(playerName + " still has " + playerHealth + " health left.");
            }
  }
};
  // Function to start a new game
  var startGame = function() {

    // Reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // Fight each enemy robot by looping over them and fighting them one at a time
    for(var i = 0; i < enemyNames.length; i++) {

      // If the player is still alive, they keeping fighting
      if (playerHealth > 0) {
        // Lets the player know what round they are in (They array starts at '0' so it needs to have 1 added to it)
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

        // Picks a new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];

        // Resets the enemyHealth value before starting a new fight
        enemyHealth = Math.floor(Math.random() * 21) + 40;

        // Pass the pickedEnemyName variable value into the fight function, it will assume the value of the enemyName parameter
        fight(pickedEnemyName);

        // If the player is still alive and it hasn't gotten to the last enemy in the array
        if (playerHealth > 0 && i < enemyNames.length - 1) {
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

      // If the player is still alive, the player wins!
      if (playerHealth > 0) {
          window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
      } else {
          window.alert("You've lost your robot in battle.");
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
       var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

       // Use switch case to carry out an action
       switch (shopOptionPrompt) {
           case 'REFILL':
           case 'refill':
              if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // Increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;

            }
            else {
                  window.alert("You don't have enough money!");
            }
              break;
            case 'UPGRADE':
            case 'upgrade':
                if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // Increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
              break;
            case 'LEAVE':
            case 'leave':
              window.alert("Leaving the store.");

              // Do nothing and the function ends
              break;
            default:
              window.alert("You did not pick a valid option. Try again.");

              // Call shop() again to force player to pick a valid option
              shop();
              break;
    }
};

// Starts the game when the page loads
startGame();