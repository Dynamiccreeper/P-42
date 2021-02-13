var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var FoodGroup,obstacleGroup;

var banana,bananaImage;
var obstacle,obstacleImage;
var gameOver,gameOverImg;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  gameOverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);

  FoodGroup=new Group();
  obstacleGroup=new Group();
  


  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
     FoodGroup.destroyEach();
     //score=score + 2;
     player.scale += + 0.1

    }
    if(obstacleGroup.isTouching(player)){
          gameState=END;



    }
    bananaSpawn();
    obstacleSpawn();

  }

  if(gameState===END){
    backgr.velocityX=0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill(255);
   // text("Game Over!",300,220);
    gameOver=createSprite(400,200);
    gameOver.addImage("anything",gameOverImg);
    gameOver.scale=0.5;
  }


  drawSprites();
}
function bananaSpawn() {
  

  if (frameCount % 80 === 0) {
banana = createSprite(550,100, 10, 10);
banana.y = Math.round(random(120,200 ));
banana.addImage(bananaImage);
banana.velocityX = -3 
banana.lifetime = 200;     
banana.scale = 0.1;
banana.depth = player.depth;
player.depth = player.depth + 1;
FoodGroup.add(banana);
return banana;

  }
}

function obstacleSpawn() {
  

    if (frameCount % 300  === 0) {
  obstacle = createSprite(550,340, 10, 10);
 
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -3 
  obstacle.lifetime = 200;
  obstacle.scale = 0.3;
  obstacle.depth = player.depth;
  player.depth = player.depth + 1;
obstacleGroup.add(obstacle);
  return obstacle;
  
    }
}
