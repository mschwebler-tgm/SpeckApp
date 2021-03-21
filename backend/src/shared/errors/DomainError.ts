export default class DomainError extends Error {
    public readonly message;

    public readonly httpStatus;

    constructor(message, httpStatus) {
        super();
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
