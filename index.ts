import State from './src/state'
import { Vector } from './src/math'
import { clearCanvas, drawCircle, basicDrawGrid, drawPhantomGrid } from './src/render'
import Player from './src/player'
import Grid from './src/grid'
import Circle from './src/circle'
import Tile from './src/tile'

//Updating verification
console.log("Looking for an honest man")
//Page State
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)
// let HoboLarry = new Image()
// HoboLarry.src = "./www/images/HoboLarry.png"
// let Treant = new Image()
// Treant.src = "./www/images/Treant.png"
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
    //useless and fun mouse centering display
    // state.map.pos = state.input.cursor.subtract(canvasSize.multiply(0.5))
    if (state.input.keys.get("d")) {
        let valid = true
        if (valid) {
            // playerMain.pos.x += playerMain.speed
            playerMain.vel.x += playerMain.speed
            // playerMain.legPush(new Vector(playerMain.acceleration, 0))
        }
    }
    if (state.input.keys.get("a")) {
        let valid = true
        if (valid) {
            playerMain.vel.x -= playerMain.speed
            // playerMain.legPush(new Vector(-playerMain.acceleration, 0))
        }
    }
    if (state.input.keys.get("w")) {
        let valid = true
        if (valid) {
            playerMain.vel.y -= playerMain.speed
            // playerMain.legPush(new Vector(0, -playerMain.acceleration))
        }
    }
    if (state.input.keys.get("s")) {
        let valid = true
        if (valid) {
            playerMain.vel.y += playerMain.speed
            // playerMain.legPush(new Vector(0, playerMain.acceleration))
        }
    }

    //collision check
    let cellsNearPlayer = state.map.cellsAround(state.map.pick(playerMain.pos))
    // console.log(cellsNearPlayer)
    let collision = false
    cellsNearPlayer.forEach(cell => {
        //do not interpret my antipathy for complacency
        let dummyPos = cell.body.pos
        let dummyCell = new Circle(dummyPos, cell.body.radius)
        if (dummyCell)
        drawCircle(dummyPos, dummyCell.radius, "red")
        //checks player collision with cell
        if (dummyCell.collides(playerMain)) {
            playerMain.correct(dummyCell)
        }
    })
    //Player Change
    if (!collision) {
        playerMain.move()
    }
    //slow down
    playerMain.slow(0.1)
}
//State Display
function render() {
    //clears canvas
    //camera movement
    // c.drawImage(HoboLarry, 0, 0, 100, 100)
    // c.drawImage(Treant, 0, 0, 100, 100)
    state.view.focus = playerMain.pos
    state.view.seekFocus(0.9)
    clearCanvas()
    drawPhantomGrid(state.map.pos.subtract(state.view.pos), state.map.dimensions, state.map.size, state.map.content)
    //actual player
    drawCircle(playerMain.pos.subtract(state.view.pos), playerMain.radius, "red")
}
//State Reload
function reload() {
    update()
    render()
    window.setTimeout(reload, 10)
}
reload()