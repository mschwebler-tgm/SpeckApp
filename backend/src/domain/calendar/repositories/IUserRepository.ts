/* eslint-disable no-unused-vars,semi */
import User from '@calendar/domain-models/User';

export default interface IUserRepository {

    findByCognitoId(cognitoId: string): Promise<User>;

    findOrCreateByCognitoId(cognitoId: string): Promise<User>;

    createForCognitoId(cognitoId: string): Promise<User>;

    save(user: User): Promise<void>;

}
