import { Vector } from "./math";

export default class Camera {
    pos: Vector
    size: Vector
    vel: Vector
    focus: Vector
    constructor(pos: Vector, size: Vector) {
        this.pos = pos
        this.focus = new Vector(0, 0)
        this.size = size
    }
    get center() {
        return this.pos.add(this.size.multiply(1/2))
    }
    seekFocus(seekSpeed) {
        //ideal position adds half size to it
        let idealPos = this.focus.subtract(this.size.multiply(0.5))
        let gap = idealPos.subtract(this.pos)
        if (gap.length > 10)
            gap = gap.normalize.multiply(seekSpeed)
        //find gap between you and ideal pos
        this.pos = this.pos.add(gap)
    }
}