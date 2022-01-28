export class InternalServerError extends Error {
    message: string;
    status = 500;
    constructor(message = 'Internal server error') {
        super();
        this.message = message;
    }
}

