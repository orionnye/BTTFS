import { Vector } from "./math"
import Grid from "./grid"
import State from "./state"

//should recieve a world model
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)
let c = canvas.getContext('2d')

export function clearCanvas() {
        // Clear the page
        c.fillStyle = "beige"
        c.fillRect(0, 0, canvasSize.x, canvasSize.y)
}
//DEV NOTE
//abstract, content from position in future
//ie: renderfunc(pos, grid, renderdetails)

//Grid Definition
export function basicDrawGrid(pos: Vector, dimensions: Vector, size: Vector, content: any[], numbered: boolean = true) {
    let tileSize = new Vector(size.x / dimensions.x, size.y / dimensions.y)
    content.forEach((row, indexR) => {
        row.forEach((tile, indexC) => {
            let currentPos = new Vector(pos.x + indexC * tileSize.x, pos.y + indexR * tileSize.y)
            strokeRect(currentPos, tileSize)
            //type definition
            if (tile.content == 1) {
                drawRect(currentPos, tileSize, "grey")
                drawCircle(tile.body.pos, tile.body.radius, "darkgrey")
            }
            //numbers
            if (numbered) {
                let textPos = new Vector(pos.x + indexC * tileSize.x - tileSize.x / 3.3, pos.y + indexR * tileSize.y)
                let currentText = indexC.toString() +", "+ indexR.toString()
                drawText(textPos, tileSize.x / 3.3, currentText)
            }
        })
    })
}
export function drawPhantomGrid(pos: Vector, dimensions: Vector, size: Vector, content: any[], numbered: boolean = true) {
    let tileSize = new Vector(size.x / dimensions.x, size.y / dimensions.y)
    content.forEach((row, indexR) => {
        row.forEach((tile, indexC) => {
            let currentPos = new Vector(pos.x + indexC * tileSize.x, pos.y + indexR * tileSize.y)
            strokeRect(currentPos, tileSize)
            //type definition
            drawCircle(tile.body.pos.add(pos), tile.body.radius, "rgba(30, 30, 30, 0.5)")
            //numbers
            if (numbered) {
                let textPos = new Vector(pos.x + indexC * tileSize.x - tileSize.x / 3.3, pos.y + indexR * tileSize.y)
                let currentText = indexC.toString() +", "+ indexR.toString()
                drawText(textPos, tileSize.x / 3.3, currentText, "rgba(0, 0, 0, 0.5)")
            }
        })
    })
}

//Cell Definition
export function fillCell(cell: Vector, grid: Grid, color: string = "red") {
    let tileSize = new Vector(grid.size.x / grid.dimensions.x, grid.size.y / grid.dimensions.y)
    let currentPos = new Vector(grid.pos.x + cell.x * tileSize.x, grid.pos.y + cell.y * tileSize.y)
    drawRect(currentPos, tileSize, color)
}
export function drawRect(pos: Vector, size: Vector, color: string = "red") {
    c.fillStyle = color
    c.fillRect(pos.x, pos.y, size.x, size.y)
}
export function strokeRect(pos: Vector, size: Vector, color: string = "black") {
    c.strokeStyle = color
    c.strokeRect(pos.x, pos.y, size.x, size.y)
}

//Character Definition
export function drawCircle(pos: Vector, radius: number, color: string = "black") {
    c.beginPath()
    c.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
    c.stroke()
    c.fillStyle = color
    c.fill()
}

//Text
export function drawText(pos: Vector, size: number, text: string, color: string = "black") {
    c.fillStyle = color
    c.font = size + "px Times New Roman"
    c.fillText(text, pos.x + size, pos.y + size)
}