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
  this.x += this.speed * dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Place enemy randomly
enemyPosition.forEach(function (positionY) {
    enemy = new Enemy(-50, positionY, 100 + Math.floor(Math.random() * 500));
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

//Constructor function for player
let Player = function (x, y,){
  // Object keys - position on X, Y axis, image
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-horn-girl.png';
};

// Define start position of player
let player = new Player(200, 400);

// Draw the player on the screen
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position
player.update = function (dt) {
    // Reset player position after reaching the water
    if (this.y < 0) {
        setTimeout(() => {
            this.resetPlayer();
        }, 500);
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
