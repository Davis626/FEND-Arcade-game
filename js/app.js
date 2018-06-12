/*
 * Global variables
 */

let allEnemies = [];
let enemyPosition = [60, 140, 220]; // Position for enemies on Y axis in array

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
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/*
 * Create player
 */

 class Player {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.sprite = 'images/char-horn-girl.png';
   }

   render() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }

   update() {
     if (this.y < 0) {
       this.y = 1;
       setTimeout(() => this.reset(), 500);
       game.scorePoints();
     }
   }

   reset() {
     this.x = 202;
     this.y = 400
   }

   handleInput(key) {
     switch (key) {
       case "left":
       //if the left key is pressed, move left one column, but not off screen
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
 * Keypress functionality
 */

// Event listener for keypress - provided by Udacity
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
