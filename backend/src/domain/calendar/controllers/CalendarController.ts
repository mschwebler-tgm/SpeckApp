import {Controller, Get, Path, Route, Tags} from "tsoa";

@Tags('Calendar')
@Route('calendar')
export class BookController extends Controller {

    @Get('{id}')
    public async getBook(
        @Path() id: string,
    ): Promise<object> {
        return {id};
    }

}
