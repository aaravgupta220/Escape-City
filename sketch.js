var luke;
var ground;
var enemy;
var platform;
var coin;
var platform;
var score = 0;
var hp = 1500;
var block;
var wpn;
var luke_animation;
var coin_image;
var morning, night;
var wpn_img;
var villain_img;
var key, keyimg, gate, gateimg;
var coinsound;

var PLAY = 1;
var END = 0;
var WAIT = 2;
var gameState = PLAY;

function preload(){

  luke_animation = loadAnimation("luke1.png", "luke2.png", "luke3.png");
  coin_image = loadImage("coin.png");
  morning = loadImage("morningvity.png");
  night = loadImage("nightcity.jpg");
  wpn_img = loadImage("sword.png");
  villain_img = loadImage("villain.png");
  keyimg = loadImage("key.png");
  gateimg = loadImage("gate.png");
  coinsound = loadSound("coins.mp3");

}

function setup() {

  createCanvas(800,600);

  luke = createSprite(50, 560, 20, 40);
  luke.addAnimation("anim", luke_animation);

  ground = createSprite(400, 590, 800, 20);
  ground.velocityX = -5;

  CoinGroup = new Group();
  PlatGroup = new Group();
  BlockGroup = new Group();
  EnemyGroup = new Group();
  WpnGroup = new Group();
  KeyGroup = new Group();

}

function draw() {

  background(morning);

  if(gameState === PLAY){

  spawnPlatform();

  spawnenemy();    

  spawnkey();

  if(ground.x < 400){
  ground.x = ground.width/2;
  }

  if(keyDown("UP_ARROW")){
    luke.velocityY = -10;
  }
  
  luke.velocityY = luke.velocityY + 0.8;

  if(keyDown("RIGHT_ARROW")){
    luke.x = luke.x + 5;
  }
  
  if(keyDown("LEFT_ARROW")){
    luke.x = luke.x - 5;
  }

  if(luke.isTouching(CoinGroup)){
    score += 5;
    CoinGroup.destroyEach();
    coinsound.play();
  }

  if(luke.isTouching(BlockGroup)){
    luke.velocityX = 0;
  }

  if(luke.isTouching(EnemyGroup)){
    hp = hp - 5; 
  }

  if(keyWentDown("SPACE")){
    wpn = createSprite(luke.x, luke.y, 10, 10);
    wpn.velocityX = 15;
    wpn.lifetime = (800-wpn.x)/15;
    wpn.addImage(wpn_img);
    wpn.scale = 0.1;
    WpnGroup.add(wpn);
  }

  if(WpnGroup.isTouching(EnemyGroup)){
    EnemyGroup.destroyEach();
  }

  if(hp === 0){
    gameState = END
  }

  if(luke.isTouching(KeyGroup)){
    gameState = WAIT;
  }

  }else if(gameState === END){

    EnemyGroup.lifetime = -1;
    PlatGroup.lifetime = -1;
    CoinGroup.lifetime = -1;

  }else if(gameState === WAIT){

    EnemyGroup.lifetime = -1;
    PlatGroup.lifetime = -1;
    CoinGroup.lifetime = -1;

    if(keyDown("R")){
      gameState = PLAY;
    }

  }

  luke.collide(ground);
  luke.collide(PlatGroup);

  drawSprites();

  if(gameState === END){

  textSize(60);
  fill("green");
  stroke("white")  
  text("GAME OVER", 250, 300);

  }

  if(gameState === WAIT){
    textSize(100);
    fill("darkblue");
    stroke("white");
    strokeWeight(15)
    text("You Won!", 250, 300);

    textSize(15);
    text("Congratulations! You have completed your mission and Luke is now safe, THANK YOU!", 110, 320);
    text("Press R to restart", 360, 20);
  }

  textSize(30);
  stroke("gold");
  text("Score : " + score, 10, 20);
  text("Hitpoints : " + hp, 10, 50);

}

function spawnPlatform(){

  if(frameCount % 60 === 0){

    platform = createSprite(790, random(0, 540), random(40, 60), 15);
    platform.shapeColor = "yellow";

    block = createSprite(platform.x - 30, platform.y, 10,platform.height);
    block.visible = false;

    coin = createSprite(platform.x, platform.y - 35, 10, 10);
    coin.addImage(coin_image);
    coin.scale = 0.1;

    platform.velocityX = -(5 + score/100);
    coin.velocityX = platform.velocityX;
    block.velocityX = platform.velocityX;

    platform.lifetime = 160;
    coin.lifetime = 160;
    PlatGroup.add(platform);
    CoinGroup.add(coin);
    BlockGroup.add(block);

  }

}

function spawnenemy(){

  if(frameCount%57 === 0){
    enemy = createSprite(790, random(0, 560), 15, 30);
    enemy.addImage(villain_img);
    enemy.scale = 0.3;
    enemy.velocityX = -5;
    enemy.velocityY = random(5, -5);
    enemy.lifetime = 160;
    enemy.collide(ground);
    EnemyGroup.add(enemy);
  }

}

function spawnkey(){

  if(frameCount%5700 === 0){

    key = createSprite(750, 590, 10, 10);
    key.addImage(keyimg);
    key.collide(ground);
    key.velocityX = -4;
    KeyGroup.add(key);
    gate = createSprite(790, 550, 40, 30);
    gate.addImage(gateimg);
    gate.collide(ground);
    gate.velocityX = -4;

  }

}