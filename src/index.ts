import State from './state'
import { Vector } from './math'
import { clearCanvas, drawCircle, drawPhantomGrid, drawImage, drawRect, drawText } from './render'
import Player from './player'
//Page State
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)
let c = canvas.getContext("2d")

//State Declaration
let dimensions = new Vector(25, 25)
let state = new State(dimensions, canvasSize, canvasSize.multiply(2))
state.input.watchCursor()
state.input.watchMouse()
state.input.watchKeys()

let playerMain = new Player(new Vector(canvasSize.x / 2, canvasSize.y / 2), 20)
playerMain.speed = 5

//random terrain switch
let randomTerrain = true
if (randomTerrain) {
    state.map.randomize(0.3)
} else {
    //custom map
    state.map.content[4][4].body.radius = 20
    state.map.setBlock(new Vector(5, 5), new Vector(10, 10), 1)
}

//State Change
function update() {

    let playerLive = playerMain.radius > 0
    
    if (playerLive) {
        //player movement
        if (state.input.keys.get("d")) {
            playerMain.vel.x += playerMain.speed
        }
        if (state.input.keys.get("a")) {
            playerMain.vel.x -= playerMain.speed
        }
        if (state.input.keys.get("w")) {
            playerMain.vel.y -= playerMain.speed
        }
        if (state.input.keys.get("s")) {
            playerMain.vel.y += playerMain.speed
        }
        
        //player size adjust
        if (state.map.containsCell(state.map.pick(playerMain.pos))) {
            if (state.input.keys.get("]") && playerMain.radius < state.map.tileSize.x) {
                playerMain.radius += 1;
            }
        }
        if (state.input.keys.get("[")) {
            playerMain.radius -= 1;
        }
        
        //collision check
        let cellsNearPlayer = state.map.bodiesAround(state.map.pick(playerMain.pos))
        // console.log(cellsNearPlayer)
        playerMain.collisionCheck(cellsNearPlayer)
    }
}
//State Display
function render() {
    //clears canvas
    clearCanvas()

    //camera movement to center player
    state.view.pos = playerMain.pos.subtract(canvasSize.multiply(0.5))
    //map details
    drawPhantomGrid(state.map.pos.subtract(state.view.pos), state.map.dimensions, state.map.size, state.map.content)
    //village
    drawPhantomGrid(state.village.pos.subtract(state.view.pos), state.village.dimensions, state.village.size, state.village.content)

    //actual player
    drawCircle(playerMain.pos.subtract(state.view.pos), playerMain.radius, "rgb(130, 30, 20)")
    //health Bar
    let bar = new Vector(playerMain.radius * 6, 50)
    drawRect(new Vector(0, 0), bar, "red")
    c.strokeRect(0, 0, bar.x, bar.y)
    drawText(new Vector(0, 0), 40, playerMain.radius.toString(), "black")
}
//State Reload
function reload() {
    update()
    render()
    window.setTimeout(reload, 10)
}
reload()