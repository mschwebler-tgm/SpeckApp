import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { injectable } from 'inversify';
import IUserRepository from '@calendar/repositories/IUserRepository';
import User from '@calendar/domain-models/User';
import { plainToClass } from 'class-transformer';

@injectable()
export default class DynamoUserRepository implements IUserRepository {
    private readonly dynamoClient: DocumentClient;

    private readonly tableName: string;

    constructor(dynamoClient: DocumentClient, tableName: string) {
        this.dynamoClient = dynamoClient;
        this.tableName = tableName;
    }

    async findByCognitoId(cognitoId: string): Promise<User> {
        const getItemOutput: DocumentClient.GetItemOutput = await this.dynamoClient.get({
            TableName: this.tableName,
            Key: { id: `user:${cognitoId}` },
        }).promise();

        return plainToClass(User, getItemOutput.Item);
    }

    async findOrCreateByCognitoId(id: string): Promise<User> {
        const item = await this.findByCognitoId(id);
        if (!item) {
            return await this.createForCognitoId(id);
        }

        return plainToClass(User, item);
    }

    async createForCognitoId(cognitoId: string) {
        const user = plainToClass(User, { id: `user:${cognitoId}` });
        await this.save(user);

        return user;
    }

    async save(user: User): Promise<void> {
        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: user,
        }).promise();
    }
}
