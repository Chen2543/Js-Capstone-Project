let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// Starts the game
let game = new Phaser.Game(config);
// Variables
let player;
let cursors;
let ground;
let obstacles;

function preload() {
  // Load assets
    this.load.image('ground', 'assets/ground.png');
    this.load.image('obstacle', 'assets/cactus.png');
    this.load.image('dinosaur', 'assets/dino.png');
}

function create() {
  // Create ground
    ground = this.physics.add.staticGroup();
    ground.create(400, 380, 'ground').setScale(2).refreshBody();
  // Create player
    player = this.physics.add.sprite(100, 300, 'dinosaur');
    player.setCollideWorldBounds(true);
    player.body.setSize(40, 50);
    player.setGravityY(800);
  // Create obstacles
    obstacles = this.physics.add.group();
  // Create inputs
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, ground, null, null, this);
    this.physics.add.overlap(player, obstacles, gameOver, null, this);
  // Loop to create obstacles (Calls createObstacle function every 2 second))
    this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: spawnObstacle,
        callbackScope: this
    });
}


function update() {
    // Player jump
    if (cursors.space.isDown && player.body.touching.down) {
        player.setVelocityY(-700);
    }
}

function spawnObstacle() {
    let obstacle = obstacles.create(800, 330, 'obstacle');
    obstacle.setVelocityX(-300);
    obstacle.setGravityY(-800);
}

function gameOver() {
    this.physics.pause();
}
