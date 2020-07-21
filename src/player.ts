import { Vector } from "./math";
import Input from "./input";
import Circle from "./circle";
import Tile from "./tile";
import { clearCanvas, drawCircle, drawPhantomGrid, drawImage, drawRect, drawText } from './render'

export default class Player extends Circle {
    color: string
    constructor(pos, radius: number = 100) {
        super(pos, radius)
        this.pos = pos
        this.radius = radius
        this.color = "red"
    }
    collisionCheck(nearbyBodies: Circle[]) {
        let collision = false
        nearbyBodies.forEach(cell => {
            //checks player collision with cell
            if (cell.collides(this)) {
                this.correct(cell)
            }
        })
        //Player Change
        if (!collision) {
            this.move()
        }
        //slow down
        this.slow(0.1)
    }
    render() {
        drawCircle(this.pos, this.radius, "brown")
    }
}