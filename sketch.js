var ghost, climber, door, tower, doorImg, climberImg, ghostImg, doorGrp, climberGrp, invisibleBlock, invisibleGrp, towerImg, inviBlockGrp;

var score=0;
var gameState = "play";

function preload() {
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  towerImg = loadImage("tower.png");
  sound1 = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

  doorsGrp = new Group();
  climberGrp = new Group();
  inviBlockGrp = new Group();
  
  //sound1.loop();
}

function draw() {
  
  background(180);
  
  
  if (gameState === "play") {
    drawSprites();
    
    fill("white");
    text("Score: "+score, 500, 50);
    score = score + Math.round(getFrameRate()/60);

    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.8;



    spawndoors();


    if (climberGrp.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (inviBlockGrp.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "END";
    }
  }
  if (gameState === "END") {
    stroke("black");
    fill("red");
    textSize(30);
    text("GameOver", 300, 300);
  }
}

function spawndoors() {
  if (frameCount % 300 === 0) {
    var door = createSprite(200, -50);
    door.addImage("door", doorImg);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGrp.add(door)
    var climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGrp.add(climber);
    climber.x = door.x;
    ghost.depth = door.depth;
    ghost.depth += 1

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    inviBlockGrp.add(invisibleBlock);
  }
}