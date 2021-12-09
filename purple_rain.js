class Rain {
    constructor(width, height, direction, posX, posY, speed, color){
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.color = color;
    }

    move(){
        this.posX += Math.sin(this.direction * Math.PI/2)  * this.speed;
        this.posY += Math.cos(this.direction * Math.PI/2)  * this.speed;
    }

    draw(){
        canvasContext.rotate(-this.direction)
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.posX, this.posY, this.width, this.height)
        canvasContext.rotate(+this.direction)
    }
}


let canvas = document.getElementById("canvas")
let canvasContext = canvas.getContext('2d');

let createRect = (x,y,width, height,color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

let allRains = []
let defaultRainWidth = 2
let defaultRainHeight = 15
let maximumRainCount = 500

let maximumRainInitializationInOneFrame = 5

let fps = 60
let gameLoop = () => {
    setInterval(show, 1000/fps)
}

let show = () => {
    update();
    draw();
}

let update = () => {
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    let rainInitCountInThisFrame = 0
    while(allRains.length < maximumRainCount && maximumRainInitializationInOneFrame > rainInitCountInThisFrame) {
        let distanceFromCam = Math.random()
        let rain = new Rain( defaultRainWidth * (2-distanceFromCam)
                                ,defaultRainHeight* (2-distanceFromCam),
                                (Math.random()/20),
                                 Math.random() * canvas.width,
                                  -100, (2-distanceFromCam) * 8, 
                                  "rgba(197, 55, 230," + ((1-distanceFromCam ))+ ")")
        allRains.push(rain);
        rainInitCountInThisFrame++
    }

    for(let i = 0; i < allRains.length; i++){
        allRains[i].move()
        if(allRains[i].posY > canvas.height || allRains[i].posX > canvas.width ) {
            console.log(allRains[i].posY)
            allRains.splice(i, 1)
        }
    }
}

let draw = () => {  
    allRains.forEach(rain=>{ 
        rain.draw()
    })
}


gameLoop()
