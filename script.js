var astronaut , alien , metal, glass, fuel;
var laser , booster, moonImg , astroImg;
var alienGroup, lives, gameState;
var bullet,bulletGroup;
var database,dataBaseCount, aliens;
var aliens = [];
var resourceGroup;
var flag = 0;

function preload(){
 gameState = 1
 lives = 5
 moonImg = loadImage("Images/Moon.jpg")
 astroImg = loadImage("Images/Astronaut.png")
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    database = firebase.database();
    astronaut = createSprite(200,120,10,10)
    astronaut.addImage(astroImg,"astro")
    astronaut.setCollider("rectangle",-30,40,150,300);
    astronaut.debug = true;
    astronaut.scale = 0.2
    alienGroup = new Group()
    bulletGroup = new Group();
    resourceGroup = new Group();
    getCount()
    getR()
}
function getCount() {
    ref = database.ref('count')
    ref.on("value", function (x) {
        dataBaseCount = x.val();
    })
}

function updateCount(updateCount) {
    ref = database.ref('/')
    ref.update({
        count: updateCount
    })
}
function getR() {
    ref = database.ref('r')
    ref.on("value", function (x) {
        dataBaseRCount = x.val();
    })
}

function updateR(updateR) {
    ref = database.ref('/')
    ref.update({
        r: updateR
    })
}

// getting the count 

getCount()
getR()
function draw(){
    if(keyDown("space")){
        flag = 0;
    }
    getCount()
    getR()
    background(moonImg)
    if((lives>0)){
        if(keyWentDown("up")){
            astronaut.velocityY = -5
        }
        if(keyWentUp("up")){
            astronaut.velocityY = 0;
            astronaut.velocityX = 0;
        }
        if(keyWentDown("down")){
            astronaut.velocityY = 5
        }
        if(keyWentUp("down")){
            astronaut.velocityY = 0;
            astronaut.velocityX = 0;
        }
        if(keyWentDown("left")){
            astronaut.velocityX = -5
        }
        if(keyWentUp("left")){
            astronaut.velocityY = 0;
            astronaut.velocityX = 0;
        }
        if(keyWentDown("right")){
            astronaut.velocityX = +5
        }
        if(keyWentUp("right")){
            astronaut.velocityY = 0;
            astronaut.velocityX = 0;
        }
        spawnAliens()
        spawnResources()
        if(alienGroup.isTouching(astronaut)){
            astronaut.velocityX = 0
            astronaut.velocityY =0 ;
            astronaut.velocityX = 0
            astronaut.velocityY =0 ;
            getCount()
            dataBaseCount -= 1
            lives = dataBaseCount;
            alert(dataBaseCount + " lives left! Be careful!")
            updateCount(dataBaseCount)
            alienGroup.destroyEach(); 
            console.log(astronaut.x);            
            flag = 1;
            alert("Press space to continue")
            //break - to come out of the loop. return - to exit the function
            astronaut.velocityX = 0;
            astronaut.velocityY = 0;
            
         }
         if(resourceGroup.isTouching(astronaut)){
            getR()
            dataBaseRCount += 1
            points = dataBaseRCount;
            alert(dataBaseRCount + " points achieved! Hurray! 😀😁")
            updateR(dataBaseRCount)

            astronaut.velocityX = 0;
            astronaut.velocityY = 0;
            astronaut.x += 50;
            astronaut.y += 50;
         }
        if(dataBaseCount == 0){
            getCount()
            gameState = 0;
        }
        aliens.forEach(a => {
            if(bulletGroup.isTouching(a)){
                a.lifetime = 0;
            }
        });
    }
    drawSprites();
}




function spawnAliens(){
    alien = createSprite(Math.round(random(0,800)),Math.round(random(0,400)),20,20)
    alien.visible = false
    if(frameCount % 40 == 0){
        alien.visible = true
        alien.shapeColor = "green"
        alien.debug = true; 
        aliens.push(alien)       
        alienGroup.add(alien)
        alien.velocityX = Math.random(20,30)
        alien.velocityY = Math.random(8,20)
    }
}

function spawnResources(){
    if(frameCount % 200 == 0){
        var resource = createSprite(Math.round(random(0,800)),Math.round(random(0,400)),20,20)
        resource.shapeColor = "orange"
        resource.lifetime = 300
        resourceGroup.add(resource);
    }
}
//resourceGroup


