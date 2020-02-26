export class Vector {
    x: number
    y: number
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    subtract(that: Vector) {
        return new Vector(this.x - that.x, this.y - that.y)
    }
    add(that: Vector) {
        return new Vector(this.x + that.x, this.y + that.y)
    }
    multiply(that: number | Vector) {
        if (typeof that === "number") {
            return new Vector(this.x * that, this.y * that)
        }
        return new Vector(this.x * that.x, this.y * that.y)
    }
    get normalize() {
        //simplifies the distances to a simple fraction
        let normal = new Vector(this.x / this.length, this.y / this.length)
        return normal
    }
    get length() {
        let dist = Math.sqrt(this.x**2 + this.y**2)
        return dist
    }
}

function foo(a: string, b: number, c: number)
function foo(a: number, b: string)
function foo(a: string | number, b: string | number) {

}

foo("bar", 12, 21);
// foo(12, 12);
// foo("bar", "baz");
foo(12, "bar");

