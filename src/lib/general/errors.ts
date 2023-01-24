export class EmptyError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'empty_error'
        Object.setPrototypeOf(this, EmptyError.prototype)
    }
}

export class IllegalValueError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'illegal_value_error'
        Object.setPrototypeOf(this, IllegalValueError.prototype)
    }
}