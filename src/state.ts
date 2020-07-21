import Grid from "./grid"
import { Vector } from "./math"
import Player from "./player"
import Input from "./input"
import Camera from "./Camera"

export default class State {
    view: Camera
    pos: Vector
    map: Grid
    village: Grid
    input: Input
    constructor(dimensions: Vector, cameraSize: Vector, size: Vector) {
        this.pos = new Vector(0, 0)
        this.view = new Camera(this.pos, cameraSize)
        this.map = new Grid(dimensions, size)
        this.village = new Grid(dimensions, size)
        this.village.pos = this.map.size
        this.input = new Input()
    }
}