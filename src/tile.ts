import Circle from "./circle"

export default class Tile {
    //Really could be anything!
    //set to number for temporary convienance
    body: Circle
    content: number
    //temporary 0 to model empty
    constructor(body: Circle, content: number = 0) {
        this.body = body
        this.content = content
    }
}