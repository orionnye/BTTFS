import { Vector } from "./math";
import Input from "./input";
import Circle from "./circle";

export default class Player extends Circle {
    deck: any[]
    color: string
    constructor(pos, radius: number = 100) {
        super(pos, radius)
        this.pos = pos
        this.radius = radius
        this.color = "red"
    }
}