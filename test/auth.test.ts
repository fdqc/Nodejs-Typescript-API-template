import 'mocha';
import { UserRegisterI } from '../src/interfaces/user';
import { AuthService } from '../src/services/authService';
import { UserModel } from '../src/models/userSchema';
import chai from 'chai';
chai.should();

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

let mongoServer: MongoMemoryServer;
const opt = { useNewUrlParser: true, useUnifiedTopology: true };

before('##Start MongoMemoryServer', async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opt);
});

after('##Disconnect and stop server', async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('#AuthService', () => {
    describe('-register()', () => {
        it('Should create a user and return a token', async () => {
            const newUser: UserRegisterI = {
                name: 'test user',
                email: 'user@test.com',
                password: 'securepassword'
            };

            const authServiceInstance = new AuthService(UserModel);
            const token = await authServiceInstance.register(newUser);

            token.should.be.string;
        });
    });

    describe('-authenticate()', () => {
        it('should successfully authenticate a user and return a token', async () => {
            const credentials = {
                email: 'user@test.com',
                password: 'securepassword'
            };

            const authServiceInstance = new AuthService(UserModel);
            const token = await authServiceInstance.authenticate(credentials.email, credentials.password);

            token.should.be.string;
        });
    });
});
