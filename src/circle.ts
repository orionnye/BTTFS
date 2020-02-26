import { Vector } from "./math";

export default class Circle {
    pos: Vector
    vel: Vector
    radius: number
    mass: number
    speed: number
    acceleration: number
    color: string
    constructor(pos: Vector, radius: number, color: string = "black") {
        this.pos = pos
        this.vel = new Vector(0, 0)
        this.radius = radius
        this.speed = 10
        this.acceleration = 1
        this.mass = 10
        this.color = color
    }
    move() {
        this.pos = this.pos.add(this.vel)
    }
    slow(friction: number) {
        let slower = this.vel.multiply(friction)
        this.vel = slower
    }
    push(force: Vector) {
        this.vel = this.vel.add(force.multiply(1/this.mass))
    }
    collides(that: Circle) {
        //Distance between
        if (that.radius <= 0 || this.radius <= 0) {
            return false
        }
        let distance = this.pos.subtract(that.pos).length
        //Combined Radius'
        let minDist = this.radius + that.radius
        if (distance < minDist) {
            return true
        }
        return false
    }
    pendingCollision(that: Circle) {
        let dummyThat = new Circle(that.pos.add(that.vel), that.radius)
        let dummyThis = new Circle(this.pos.add(this.vel), this.radius)
        if (dummyThat.collides(dummyThis)) {
            return true
        }
        return false
    }
    correct(that: Circle) {
        //define angle
        let angle = that.pos.subtract(this.pos).normalize
        //define minDist
        let minDist = this.radius + that.radius
        //multiply minDist by angle
        let fix = angle.multiply(minDist)
        //find distance till acceptable
        this.pos = that.pos.subtract(fix)
    }
    render(g: CanvasRenderingContext2D) {
        let {pos, color, radius} = this
        g.beginPath()
        g.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
        g.stroke()
        g.fillStyle = color
        g.fill()
    }
}