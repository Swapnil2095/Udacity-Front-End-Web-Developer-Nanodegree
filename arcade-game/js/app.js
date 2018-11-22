(function() {
  //my variables
  let no_of_lives = 5;
  let score = 0;
  let is_game_over = false;

  //display Game Board
  function displayScoreBoard() {
    document.getElementById("lives").innerHTML = no_of_lives;
    document.getElementById("score").innerHTML = score;
    //document.getElementById("gamestatus").innerHTML = is_game_over;
  }

  displayScoreBoard();

  //reset global variables
  function resetGameVariables() {
    no_of_lives = 5;
    score = 0;
    is_game_over = false;
  }

  // Enemies our player must avoid
  var Enemy = function Enemy(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -100;
      let increaseSpeed = Math.floor(Math.random() * 4 + 1);
      //increasing speed as score increases -> making harder with score
      this.speed = (100 + (score > 0 ? score / 20 : score)) * increaseSpeed;
    }
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  const x_player = [0, 101, 202, 303, 404];
  const y_player = [314, 404];

  const Player = function Player() {
    this.sprite = "images/char-boy.png";
    this.x = x_player[Math.floor(Math.random() * x_player.length)];
    this.y = y_player[Math.floor(Math.random() * y_player.length)];
    while (this.x == this.y) {
      this.y = y_player[Math.floor(Math.random() * y_player.length)];
    }
    this.vertical_move = 90;
    this.horizontal_move = 100;
    this.victory = false;
    console.log("Player: ", this.x, this.y);
  };

  Player.prototype.update = function(dt) {
    //all directions
    let playerTopMax = this.y - 60;
    let playerBottomMax = this.y + 60;
    let playerLeftMax = this.x - 70;
    let playerRightMax = this.x + 70;

    //collision detection
    for (let enemy of allEnemies) {
      if (
        enemy.x > playerLeftMax &&
        enemy.x < playerRightMax &&
        enemy.y > playerTopMax &&
        enemy.y < playerBottomMax
      ) {
        player.resetPosition();
        no_of_lives--;
        score = 0; // collision make score to zero
        displayScoreBoard();

        if (no_of_lives === 0) {
          alert("Game Over!!");
          player.resetPosition();
          is_game_over = true;
          displayScoreBoard();
          resetGameVariables();
        }
      }
    }
  };

  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  Player.prototype.handleInput = function(direction) {
    switch (direction) {
      case "up":
        if (this.y > 0) {
          this.y -= this.vertical_move; //90;
          if (this.y <= 0) {
            console.log("Win The Game.");
            this.victory = true;
            //window.gem = new Gem();
            //window.Heart = new Heart();
            displayScoreBoard();
            show_modal();
            //this.resetPosition();
          }
        }

        console.log(this.y);
        break;

      case "down":
        if (this.y <= this.vertical_move * 4) {
          this.y += this.vertical_move; // 90;
        }
        console.log(this.y);
        break;

      case "left":
        if (this.x > this.horizontal_move) {
          this.x -= this.horizontal_move; //100;
        }
        console.log(this.x);
        break;

      case "right":
        if (this.x <= this.horizontal_move * 4) {
          this.x += this.horizontal_move; //100;
        }
        console.log(this.x);
        break;
    }
  };

  Player.prototype.resetPosition = function() {
    this.x = x_player[Math.floor(Math.random() * x_player.length)];
    this.y = y_player[Math.floor(Math.random() * y_player.length)];
    while (this.x == this.y) {
      this.y = y_player[Math.floor(Math.random() * y_player.length)];
    }
  };

  const players = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
  ];

  let enemy_1 = new Enemy(
    -80,
    60 + 80 * 0,
    Math.floor(Math.random() * 4 + 1) * 60
  );
  let enemy_2 = new Enemy(
    -80,
    60 + 80 * 1,
    Math.floor(Math.random() * 4 + 1) * 60
  );
  let enemy_3 = new Enemy(
    -80,
    60 + 80 * 2,
    Math.floor(Math.random() * 4 + 1) * 60
  );

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player
  window.allEnemies = [enemy_1, enemy_2, enemy_3];
  window.player = new Player();

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener("keyup", function(e) {
    var allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });

  //extra features
  const x_blocks = [0, 101, 202, 303, 404];
  const y_blocks = [50, 150, 204];

  const gems = [
    { name: "Orange Gem", image: "images/GemOrange.png", value: 10 },
    { name: "Blue Gem", image: "images/GemBlue.png", value: 25 },
    { name: "Green Gem", image: "images/GemGreen.png", value: 50 }
  ];

  const Gem = function Gem() {
    let g = gems[Math.floor(Math.random() * gems.length)];
    this.name = g.name;
    this.image = g.image;
    this.value = g.value;

    this.x = x_blocks[Math.floor(Math.random() * x_blocks.length)];
    this.y = y_blocks[Math.floor(Math.random() * y_blocks.length)];
    console.log("Gem: ", this.x, this.y);
  };

  Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
  };

  //function to get collected gems by collision
  Gem.prototype.collected = function() {
    let topMax = this.y - 40;
    let bottomMax = this.y + 40;
    let leftMax = this.x - 40;
    let rightMax = this.x + 40;

    if (
      player.x > leftMax &&
      player.x < rightMax &&
      player.y > topMax &&
      player.y < bottomMax
    ) {
      score += this.value;
      displayScoreBoard();
      //alert("Gem Collected.. Score = " + score);
      window.gem = new Gem();
    }
  };

  const Heart = function Heart() {
    this.image = "images/Heart.png";
    this.x = x_blocks[Math.floor(Math.random() * x_blocks.length)];
    this.y = y_blocks[Math.floor(Math.random() * y_blocks.length)];
    console.log("Heart: ", this.x, this.y);
  };

  Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
  };

  //function to get collected heart by collision
  Heart.prototype.collected = function() {
    let topMax = this.y - 40;
    let bottomMax = this.y + 40;
    let leftMax = this.x - 40;
    let rightMax = this.x + 40;
    if (
      player.x > leftMax &&
      player.x < rightMax &&
      player.y > topMax &&
      player.y < bottomMax
    ) {
      no_of_lives++;
      displayScoreBoard();
      //alert("Heart Collected.. ");
      window.heart = {};
    }
  };

  const Selector = function Selector() {
    this.image = "images/Selector.png";
    this.x = 404;
    this.y = 404;
    console.log("Selector: ", this.x, this.y);
  };

  Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
  };

  //player icon change by collision method
  Selector.prototype.stopped_on = function() {
    let topMax = this.y - 40;
    let bottomMax = this.y + 40;
    let leftMax = this.x - 40;
    let rightMax = this.x + 40;

    if (
      player.x > leftMax &&
      player.x < rightMax &&
      player.y > topMax &&
      player.y < bottomMax
    ) {
      let old_player = player.sprite;
      player.sprite = players[Math.floor(Math.random() * players.length)];
      while (old_player == player.sprite) {
        player.sprite = players[Math.floor(Math.random() * players.length)];
      }
      //alert("Player Character Changed..");
      player.resetPosition();
    }
  };

  window.gem = new Gem();
  window.heart = new Heart();
  window.selector = new Selector();

  /*
*  Modal functions
*/

  // show modal
  function show_modal() {
    show_game_win_info();
    $(".modal .modal-body").css("overflow-y", "auto");
    $(".modal .modal-body").css("max-width", $(window).width() * 0.8);
    $(".modal-content").css("max-width", $(window).width() * 0.8);
    $("#game_win_modal").modal("show");
  }

  //hide modal
  function hide_modal() {
    $("#game_win_modal").modal("hide");
  }

  //wining game info
  function show_game_win_info() {
    // Output the result in an element
    document.getElementById("playerScore").innerHTML = score.toString();
    document.getElementById("playerLives").innerHTML = no_of_lives.toString();
  }

  //event listener to play again button
  playAgain.addEventListener("click", function(ev) {
    if (ev && ev.preventDefault) {
      ev.preventDefault();
    }
    player.victory = false;
    player.resetPosition();
    //hide  modal
    hide_modal();
    console.log("Game Restarted Again!");
    resetGameVariables();
    displayScoreBoard();
  });
})();
