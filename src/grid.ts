import { Vector } from "./math"
import Tile from "./tile"
import Circle from "./circle"

export default class Grid {
    pos: Vector
    size: Vector
    content: any[]
    dimensions: Vector
    wall: number
    empty: number
    constructor(dimensions: Vector, size = new Vector(100, 100)) {
        this.pos = new Vector(0, 0)
        this.size = size
        this.dimensions = dimensions
        this.content = []
        //temporary fixed numbers
        this.wall = 1
        this.empty = 0
        //Map definition
        for (let r = 0; r < this.dimensions.y; r++) {
            this.content.push([])
            for (let c = 0; c < this.dimensions.x; c++) {
                let averageSize = 0
                let tilePos = new Vector(c, r).multiply(this.tileSize.x).add(this.tileSize.multiply(0.5))
                let tileBody = new Circle(tilePos, averageSize)
                this.content[r].push(new Tile(tileBody, this.empty))
            }
        }
    }
    get tileSize() {
        let tileSize = new Vector(this.size.x / this.dimensions.x, this.size.y / this.dimensions.y)
        return tileSize
    }
    randomize(blockChance: number) {
        //TEMPORARY PLACEHOLDER NUMBER
        this.content.forEach((row, IRow) => {
            row.forEach((tile, ICol) => {
                let currentPos = new Vector(ICol, IRow)
                let isBlock = Math.random() < blockChance
                if (isBlock)
                    this.set(currentPos, this.wall)
            })
        })
    }
    set(pos: Vector, value) {
        if (pos.y >= this.dimensions.y || pos.x >= this.dimensions.x)
            console.error("tried setting value on grid that does not exist")
            if (value == this.wall) {
                this.content[pos.y][pos.x].body.radius = this.tileSize.x / 2
            }
        this.content[pos.y][pos.x].content = value
    }
    setBlock(pos: Vector, size: Vector, value: number) {
        if (pos.y >= this.dimensions.y || pos.x >= this.dimensions.x)
            console.error("tried setting value on grid that does not exist")
        if (pos.y + size.y >= this.dimensions.y || pos.x + size.x >= this.dimensions.x)
            console.error("tried setting value on grid that does not exist")
        for (let r = pos.y; r < pos.y + size.y; r++) {
            for (let c = pos.x; c < pos.x + size.x; c++) {
                if (value == this.wall) {
                    this.content[r][c].radius = this.tileSize.x
                }
                this.content[r][c].content = value
            }
        }
    }
    containsCell(point: Vector) {
        if (point.x >= 0 && point.x < this.dimensions.x) {
            if (point.y >= 0 && point.y < this.dimensions.y) {
                return true
            }
            return false
        }
        return false
    }
    bodiesAround(point: Vector) {
        let cells = []
        for (let r = point.y - 1; r <= point.y + 1; r++) {
            for (let c = point.x - 1; c <= point.x + 1; c++) {
                //if valid return cell vector or TILE
                let currentIndex = new Vector(c, r)
                if (this.containsCell(currentIndex)) {
                    cells.push(this.content[r][c].body)
                }
            }
        }
        return cells
    }
    pick(cursor: Vector) {
        //+distance from gridPOS divided by total cells in that direction and math.floored
        // if (!this.contains(cursor)) {
        //     console.error("tried picking a non-existant cell:", cursor)
        // }
        let cellSize = new Vector(this.size.x / this.dimensions.x, this.size.y / this.dimensions.y)
        let pickedX = Math.floor((cursor.x - this.pos.x) / cellSize.x)
        let pickedY = Math.floor((cursor.y - this.pos.y) / cellSize.y)
        let picked = new Vector(pickedX, pickedY)
        return picked
    }
    move(distance: Vector) {
        this.pos = this.pos.add(distance)
    }
}