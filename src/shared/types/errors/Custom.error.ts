export class CustomError extends Error {
    status: number;
    message: string;

    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}