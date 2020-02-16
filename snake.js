const my_canvas = document.querySelector(".canvas");
const ctx = my_canvas.getContext("2d");
const scale = 10;
const rows = my_canvas.height / scale;
const columns = my_canvas.height / scale;

var snake;

let g_food_x = 0;
let g_food_y = 0;

// Create A snake and create method and some vars to store x_coordinate & y_coordinate

function Snake() {
  this.x_coordinate = 12;
  this.y_coordinate = 12;
  this.x_step = scale * 1;
  this.y_step = 0;
  this.total = 0;
  this.tail = [];

  // Last known coordinates
  this.last_x = 0;
  this_last_y = 0;
  this.temp_origin_x = 12;
  this.temp_origin_y = 0;

  this.draw = function() {
    ctx.fillRect(this.x_coordinate, this.y_coordinate, scale, scale);
    ctx.fillStyle = "green";
  };

  this.update = function() {
    this.x_coordinate += this.x_step;
    this.y_coordinate -= this.y_step;
    this.last_x = this.temp_origin_x + this.x_step;
    this.temp_origin_x = this.last_x;
    this.last_y = this.temp_origin_y + this.y_step;
    this.temp_origin_y = this.last_y;

    // console.log(
    //   "Last X coordinate is " +
    //     this.last_x +
    //     "Last Y coordinate is " +
    //     this.last_y
    // );

    if (this.x_coordinate > my_canvas.width) {
      console.log("border right");
      this.y_step = 0;
      this.x_step = -this.x_step;
      my_canvas.width -= 1;
    }
    if (this.x_coordinate < 0) {
      console.log("Collision detected: border left");
      this.y_step = 0;
      this.x_step = -this.x_step;
      my_canvas.width -= 1;
    }
    if (this.y_coordinate > my_canvas.height) {
      console.log("Collision detected: down border");
      this.x_step = 0;
      this.y_step = -this.y_step;
      my_canvas.height -= 1;
    }
    if (this.y_coordinate < 0) {
      console.log("Collision detected: Top border");
      this.x_step = 0;
      this.y_step = -this.y_step;
      my_canvas.height -= 1;
    }
  };

  this.changeDirection = function(direction) {
    switch (direction) {
      case "Up":
        this.x_step = 0;
        this.y_step = scale * 1;
        break;
      case "Down":
        this.x_step = 0;
        this.y_step = -scale * 1;
        break;
      case "Left":
        this.y_step = 0;
        this.x_step = -scale * 1;
        break;
      case "Right":
        this.y_step = 0;
        this.x_step = scale * 1;
        break;
    }
  };

  this.eat = function(food) {
    if (
      parseInt(this.g_food_x) == parseInt(this.x_coordinate) ||
      parseInt(this.g_food_y) == parseInt(this.y_coordinate)
    ) {
      console.log("Eating food");
      pickLocation(food);
    }
  };
}

// Create an self invoking function that will call itself and init the snake

(function setup() {
  snake = new Snake();

  // Create a timeout function
  window.setInterval(() => {
    ctx.clearRect(0, 0, my_canvas.clientWidth, my_canvas.height);
    snake.update();
    snake.draw();
    food.draw();

    if (snake.eat(food)) {
      console.log("Eating");
    }
  }, 50);
})();

// Listen to key press

window.addEventListener("keydown", evt => {
  const direction = evt.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

// function food

function food() {
  this.food_x = 0;
  this.food_y = 0;

  this.pickLocation = function() {
    this.food_x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.food_y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    g_food_x = parseInt(this.food_x);
    console.log(this.g_food_x);
    g_food_y = parseInt(this.food_y);
    console.log(this.food_y);
  };

  this.draw = function() {
    ctx.fillRect(this.food_x, this.food_y, scale, scale);
    ctx.fillStyle = "blue";
  };
}

food = new food();
food.pickLocation();
console.log(food);
