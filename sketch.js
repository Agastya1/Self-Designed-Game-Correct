const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine, world;
var bg, back;
var barryImg, barry, barryFly, edges;
var bulletGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver;
var score =0;

function preload(){
barryImg = loadAnimation("Images/Barry1.png","Images/Barry 2.png");
barryFly = loadAnimation("Images/barry.png");
bulletImg = loadAnimation("Images/Black.png", "Images/Green.png", "Images/Red.png");
gameOverImg = loadAnimation("Images/gameover.png");
bg = loadImage("Images/New Project.jpg");
coinImg = loadAnimation("Images/Coin.png");
fireballImg = loadAnimation("Images/fireball.png");
}

function setup() {
  engine = Engine.create();
  world = engine.world;
  createCanvas(1200,500);
  score = 0; 
  ground = createSprite(600,490,1200,10);
  ground.velocityX = -4;
  gameOver = createSprite(600,250);
gameOver.addAnimation("over", gameOverImg);
  back = createSprite(600, 250, 1200, 500);
  back.addImage(bg);
  back.velocityX = -3;
  back.scale =1.5;
  barry = createSprite(200, 420, 50,50);
  barry.addAnimation("barry",barryImg);
barry.addAnimation("barry1",barryFly );
  barry.scale = 0.6;
  //barry.debug = true;
  barry.setCollider("rectangle",0,0,100,150);
  edges = createEdgeSprites();
  bulletGroup = createGroup();
  coinGroup = createGroup();

}

function draw() {
  background(255,255,255);  
  //console.log(gameOver);
  
  if(gameState === PLAY){
    gameOver.visible = false;
    if(bulletGroup.isTouching(barry)){
      gameState = END
        
     }
     
       barry.bounceOff(edges);
      
    if(back.x < 0){
      back.x =( back.width+500)/2;
    }
    
     if(ground.x < 0){
      ground.x =( ground.width+500)/3;
    }
    
    if(keyDown("space")){
      barry.changeAnimation("barry1");
      barry.velocityY = -10;
      spawnFireball();
     
    } else {
      barry.changeAnimation("barry");
    }
    barry.velocityY = barry.velocityY+0.5;
  if(barry.isTouching(coinGroup)){
    score = score+1;
    coinGroup.destroyEach();  
  }
    spawnRocket();
    spawnCoin();
  } else if(gameState === END){
    back.visible= false;
gameOver.visible = true;
ground.visible = false;
bulletGroup.destroyEach();
barry.velocityY = 0;
barry.visible = false;
coinGroup.destroyEach();
  }
  
  
  
 
  
  
  
 
 barry.collide(ground);
 
  drawSprites();
  fill("red");
  textSize(25);
  text("Score: " + score, 50,50)
}
function spawnRocket(){
  if(frameCount % 70 === 0){
    var obstacle = createSprite(1000,Math.round(random(50,450)))
    obstacle.addAnimation("bullet", bulletImg);
    obstacle.scale = .12;
    obstacle.velocityX = -5;
    bulletGroup.add(obstacle);
  }
}
function spawnCoin(){
  if(frameCount % 200 === 0){
    var coin = createSprite(1000, Math.round(random(50,450)))
    coin.addAnimation("coin", coinImg);
    coin.scale = 0.04;
    coin.velocityX = -7;

    coinGroup.add(coin);
  }
}
function spawnFireball(){
  if(frameCount % 1 === 0){
    var fireball = createSprite(barry.x, barry.y);
    fireball.velocityY = 20;
    fireball.scale = 0.05;
    fireball.addAnimation("fireball",fireballImg);

  }
}
