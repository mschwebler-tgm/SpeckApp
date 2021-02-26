import User from "@calendar/domain-models/User";

export default interface IUserRepository {

    find(cognitoId: string): Promise<User>;

    findOrCreate(cognitoId: string): Promise<User>;

    save(user: User): Promise<void>;

}
