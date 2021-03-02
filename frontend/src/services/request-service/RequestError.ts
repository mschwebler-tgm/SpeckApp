export default class RequestError extends Error {
    private readonly response: any;

    constructor(response: any) {
        super('Error on request.');
        this.response = response;
    }
}
