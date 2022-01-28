export class NotFoundError extends Error {
    message: string;
    status = 400
    constructor(message = 'Not found error exception') {
        super();
        this.message = message;
    }

}