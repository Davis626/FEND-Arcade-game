/*
 * Global variables
 */

let allEnemies = [];
let enemyPosition = [58,141,224]; // Position for enemies on Y axis in array

/*
 * Create enemies
 */

// Constructor function for enemy
let Enemy = function(x, y, speed) {
  // Object keys - position on X, Y axis, speed, image
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {

  // Multiply movement by the delta time (dt) parameter
  // to ensure the game runs the same speed for all computers
  this.x += this.speed * dt;

  // Reposition enemies after running out of screen
  if (this.x >= 505) {
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 500);
  }
};

// Place enemies randomly
enemyPosition.forEach(function (positionY) {
    enemy = new Enemy(-100, positionY, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});
// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Create player
 */

// creating player class
 class Player {
   // Object keys - position on X, Y axis, image
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.sprite = 'images/char-horn-girl.png';
   }

   // Draw the player on the screen
   render() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }

   update() {
     //Return player to starting position and add points after reaching the water
     if (this.y < 0) {
       this.y = 1;
       setTimeout(() => this.reset(), 500);
       game.scorePoints();
     }

     //Check for collision with enemy bugs
     if (this.y === 68 || this.y === 151 || this.y ===  234) {
       let thisPlayer = this;
       allEnemies.forEach(function(enemy){
         if (enemy.x+75 > thisPlayer.x && thisPlayer.x+75 > enemy.x && thisPlayer.y === enemy.y+10)  {
           alert();
           thisPlayer.reset();
         }
       })
     }
   }

   //Reset to starting position
   reset() {
     this.x = 202;
     this.y = 400
   }

   //Move player inside canvas
   handleInput(key) {
     switch (key) {
       case "left":
       this.x - 100 >= 0 ? this.x = this.x - 100 : undefined;
       break;

       case "right":
       this.x + 100 <= 500 ? this.x = this.x + 100 : undefined;
       break;

       case "up":
       this.y - 83 >= -83 ? this.y = this.y - 83 : undefined;
       break;

       case "down":
       this.y + 83 <= 400 ? this.y = this.y + 83: undefined;
       break;
     }
   }
 }


// Define start position of player
let player = new Player(202, 400);


/*
 * Event listener for keypress - provided by Udacity
 */

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
