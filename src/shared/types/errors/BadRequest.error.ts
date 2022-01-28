export class BadRequestError extends Error {
    message: string;
    status = 400;
    constructor(message = 'Bad request error') {
        super();
        this.message = message;
    }
}