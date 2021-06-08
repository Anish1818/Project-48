var bg,bgImg;
var ground,groundImg;
var player;
var hImg,helicopter;
var log,logImg;
var logGroup;
var helicopterGroup;
var logCollection=[]
var playerImg;
var heartImg;
var life=3;
var score=0;
var startBg,startBgImg;
var playButton,playButtonImg;
var gameOverSound;
var hitSound;
var jumpSound;
var backButton,backButtonImg;
var coin,coinImg;
var gameState="start";

function preload(){
  bgImg=loadImage("Background.png");
  groundImg=loadImage("Ground.png");
  hImg=loadAnimation("helicopter1.png","helicopter2.png","helicopter3.png","helicopter4.png");
  logImg=loadImage("Log.png");
  playerImg=loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png");
  playerHitImg=loadAnimation("man3.png");
  heartImg=loadImage("heart.png");
  playButtonImg=loadImage("Buttons.png");
  startBgImg=loadImage("StartBg.jpg");
  gameOverSound=loadSound("Game Over.mp3");
  hitSound=loadSound("Hit Sound.mp3");
  jumpSound=loadSound("jump.mp3");
  backButtonImg=loadImage("Back.png");
  coinImg=loadImage("Coin.png");
}
function setup() {
  createCanvas(1200,550);

  startBg=createSprite(600,120,1200,550);
  startBg.addImage(startBgImg);

  playButton=createSprite(600,230,1200,550);
  playButton.addImage(playButtonImg);
  playButton.scale=0.06;

  aboutButton=createSprite(600,300,1200,550);
  aboutButton.addImage(playButtonImg);
  aboutButton.scale=0.06;

  helpButton=createSprite(600,370,1200,550);
  helpButton.addImage(playButtonImg);
  helpButton.scale=0.06;

  backButton=createSprite(100,40,50,50);
  backButton.addImage(backButtonImg);
  backButton.scale=0.5;
  backButton.visible=false;

  bg=createSprite(600,120,1200,550);
  bg.addImage(bgImg);
  bg.scale=1.3;
  bg.velocityX=-10;
  bg.visible=false;

  ground=createSprite(600,750,1200,550);
  ground.addImage(groundImg);
  ground.scale=1;
  ground.velocityX=-10;
  ground.visible=false;

  invisibleGround=createSprite(600,520,1200,10);
  invisibleGround.visible=false;

  player=createSprite(100,500,10,40);
  player.addAnimation("player1",playerImg);
  player.addAnimation("player2",playerHitImg);
  player.scale=0.4;
  player.visible=false;

  logGroup=new Group();
  helicopterGroup=new Group();
  coinGroup=new Group();
}
function draw() {
  background("black");
  drawSprites();
  
  if(gameState==="start"){

    bg.visible=false;
    playButton.visible=true;
    aboutButton.visible=true;
    helpButton.visible=true;
    backButton.visible=false;
    startBg.visible=true;

    fill("white");
    textSize(25);
    strokeWeight(3);
    text("PLAY",570,240);
    textSize(20);
    text("ABOUT ME",550,310);
    textSize(25);
    text("HELP",570,380);
    if(mousePressedOver(playButton)){
      gameState="play";

    }
    if(mousePressedOver(aboutButton)){
      gameState="about";

    }
    if(mousePressedOver(helpButton)){
      gameState="help";

    }
  }
  if(gameState==="about"){
    bg.visible=false;
    playButton.visible=false;
    aboutButton.visible=false;
    helpButton.visible=false;
    backButton.visible=true;
    startBg.visible=false;

    fill("white");
    textSize(50);
    text("ABOUT ME",500,50);
    textSize(25);
    text("My name is Anish Agarwal. I study in 8th grade in Sadhu Vaswani International School.",50,150);
    text("I have learnt game development through JavaScript. ",50,180);
    text("My project's name is Indian Army Commando Game.",50,210);
    text("If you are having any suggestions you can reach out to me through my github id",50,240);
    text("My Github Id is https://github.com/Anish1818",50,270);
    text("You can also drop me mails for any further suggestions",50,300);
    text("My email id is anishagarwal2411@gmail.com",50,330);
    
    

    if(mousePressedOver(backButton)){
      gameState="start";

    }
  }

  if(gameState==="help"){
    bg.visible=false;
    playButton.visible=false;
    aboutButton.visible=false;
    helpButton.visible=false;
    backButton.visible=true;
    startBg.visible=false;
    fill("white");
    textSize(50);
    text("HELP",500,50);
    textSize(25);
    text("The goal of the game is to save the commando from the obstacles.",50,150);
    text("You can control the commando using the up arrow key",50,180);
    text("There are helicopters in the sky which drop wooden logs",50,210);
    text("You have three lives to save the commando",50,240);
    text("If you touch a wooden log 1 life will be deducted",50,270);
    text("If you lose three lives the game will be over",50,300);



    if(mousePressedOver(backButton)){
      gameState="start";

    }
  }

  if(gameState==="play"){
    startBg.visible=false;
    playButton.visible=false;
    aboutButton.visible=false;
    helpButton.visible=false;
    backButton.visible=false;
    bg.visible=true;
    player.visible=true;
    ground.visible=true;

    if(coinGroup.isTouching(player)){
      coinGroup.destroyEach();
      score=score+5;
    }

    textSize(30);
    fill("black");
    stroke("white");
    text("SCORE: "+score,1000,64);

    

  if(bg.x<0){
    bg.x=bg.width/2;
  }

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("up")){
    player.velocityY=-15;
    jumpSound.play();
  }
  player.velocityY=player.velocityY+1;
  player.collide(invisibleGround);
  
  for(var i=0;i<logCollection.length;i++){

    if(logCollection[i].isTouching(invisibleGround)){
      logCollection[i].velocityX=-10;
      logCollection[i].velocityY=0;
      
    }
  }
  if(player.isTouching(logGroup)){
    logGroup.destroyEach();
    life=life-1
    hitSound.play();
  }
  
  if(life===3){
    image(heartImg,100,25,50,50);
    image(heartImg,150,25,50,50);
    image(heartImg,200,25,50,50);
  }
  if(life===2){
    image(heartImg,100,25,50,50);
    image(heartImg,150,25,50,50);
  }
  if(life===1){
    image(heartImg,100,25,50,50);
  }
  if(life===0){
    gameState="end";
    gameOverSound.play();
  }
  spawnCoins();
  spawnHelicopter();
}

if(gameState==="end"){

  textSize(30);
  fill("black");
  stroke("white");
  text("SCORE: "+score,1000,64);

  bg.velocityX=0;
  player.changeAnimation("player2",playerHitImg);
  helicopterGroup.setVelocityXEach(0);
  logGroup.setVelocityXEach(0);
  ground.velocityX=0;
  player.velocityY=0;
  fill("red");
  textSize(100);
  text("GAME OVER",300,200);
}
  
}
function spawnHelicopter(){
  if(frameCount%150===0){
    helicopter=createSprite(1200,random(50,250));
    helicopter.addAnimation("h1",hImg);
    helicopter.velocityX=-9;
    helicopter.lifetime=300;
    helicopter.scale=0.7;

    log=createSprite(1200,helicopter.y);
    log.addImage(logImg);
    log.velocityX=-(random(2,5));
    log.velocityY=5;
    log.lifetime=300;
    log.scale=0.2;
    log.depth=helicopter.depth;
    helicopter.depth=helicopter.depth+1;

    logGroup.add(log);
    helicopterGroup.add(helicopter);
    logCollection.push(log);

  }
}
function spawnCoins(){
  if(frameCount%150===0){
    coin=createSprite(1200,450);
    coin.addImage(coinImg);
    coin.velocityX=-5;
    coin.lifetime=300;
    coin.scale=0.1;

    coinGroup.add(coin);
    
    
  }
}