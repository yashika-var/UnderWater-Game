var bg;
var player;
var obstacle1,obstacle2,obstacle3,obstacle4;
var bg_img;
var player_img;
var ob1_img,ob2_img,ob3_img,ob4_img;
var edges;
var sharkG,crabG;
var gameState = "start";

function preload(){
  bg_img = loadImage("image.png");
  player_img = loadAnimation("s1.png","s2.png","s3.png","s4.png","s5.png","s6.png","s7.png","s8.png","s9.png","s10.png");
  ob1_img = loadImage("crab.png");
  ob2_img = loadImage("shark.png");
  startBg = loadImage("oceanf.jpg")
}

function setup(){
  createCanvas(600,400);
  
  edges = createEdgeSprites();
  
  bg = createSprite(240,200,600,400);
  bg.addImage(bg_img);
  bg.scale = 1.12;
  bg.x = bg.width/2;
  
  player = createSprite(100,100,10,10);
  player.addAnimation("swim",player_img)
  player.scale = 0.7;
  
  sharkG = createGroup();
  crabG = createGroup();
  
  player.debug = false;
  player.setCollider("rectangle",0,0,200,100)
  score = 0;
}

function draw(){
  background("blue");
  player.velocityY = 0;
  if(gameState=="start"){
    background(startBg)
    fill("black")
    textSize(40)
    text("🐠Press Space To Start🐠",50,200)
    if(keyDown("space")){
      gameState = "play"
    }
  }else
  if(gameState=="play"){
    bg.velocityX = -3;
    score = score+1

    if(bg.x<0){
    bg.x = bg.width/2
  }
  
  if(keyDown("UP_ARROW")){
    player.velocityY = -10
  }
  
  if(keyDown("DOWN_ARROW")){
    player.velocityY = 10
  }
  
  player.collide(edges[2]);
  player.collide(edges[3]);
  
  obstacle();
  
  drawSprites()
    fill("black")
    textSize(20)
      text("Score:"+score,500,40)
     if(player.isTouching(crabG)){
       gameState = "end"
     }
    
    if(player.isTouching(sharkG)){
      gameState = "end"
    }
    
     }
  else if(gameState=="end"){
    bg.velocityX = 0;
    crabG.setVelocityXEach = 0;
    sharkG.setVelocityXEach = 0;
    background("black");
    fill("white")
    textSize(30)
    text("Press Enter To Restart",150,150)
    textSize(40)
    text("GAME OVER",180,200)
    fill("black")
    textSize(80)
    text("😭",250,300)
    if(keyDown("enter")){
      gameState = "start"
      score = 0;
    }
  }

}

function obstacle(){
  if(frameCount%100==0){
    ob1 = createSprite(600,300,10,10);
    ob1.addImage(ob1_img)
    ob1.scale = 0.3;
    ob1.velocityX = -8
    var r = Math.round(random(30,370))
    ob1.y = r
    ob1.lifetime = 610;
    crabG.add(ob1);
    ob1.debug = false;
    ob1.setCollider("circle",0,0,100)
  
  }

  if(frameCount%120==0){
    ob2 = createSprite(600,100,10,10);
    ob2.addImage(ob2_img)
    ob2.scale = 1;
    ob2.velocityX = -8
    var r1 = Math.round(random(30,370))
    ob2.y = r1
    ob2.lifetime = 610;
    sharkG.add(ob2);
    ob2.debug = false;
    ob2.setCollider("rectangle",0,0,150,50)
  }
  
}
