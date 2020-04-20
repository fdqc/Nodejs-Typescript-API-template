import 'mocha';
import { UserRegisterI } from '../../src/interfaces/user';
import { AuthService } from '../../src/services/authService';
import { UserModel } from '../../src/models/userSchema';
import chai from 'chai';
chai.should();

/**
 * Tests are still low with mongodb-memory-server
 * @todo: find a faster way
 */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

let mongoServer: MongoMemoryServer;
const opt = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

// Resolves if the input promise fails
const promiseShouldFail = (promise: Promise<any>) => {
    return new Promise((resolve, reject) => {
        promise
        .then(() => {
            reject(new Error('This is an error'));
        })
        .catch(() => {
            resolve();
        });
    });
};

before('##Start MongoMemoryServer', async () => {
    mongoServer = new MongoMemoryServer({ binary: { version: '4.2.5' } });
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opt);
});

after('##Disconnect and stop server', async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('#AuthService', () => {
    /**
     * Tests for register()
     */
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

        it('Should throw an error using existing email', async () => {
            const newUser: UserRegisterI = {
                name: 'test user',
                email: 'user@test.com',
                password: 'securepassword'
            };

            const authServiceInstance = new AuthService(UserModel);
            return promiseShouldFail(authServiceInstance.register(newUser));
        });
    });

    /**
     * Tests for authenticate()
     */
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

        it('should throw an error using incorrect password', async () => {
            const credentials = {
                email: 'user@test.com',
                password: 'securepass'
            };

            const authServiceInstance = new AuthService(UserModel);
            return promiseShouldFail(authServiceInstance.authenticate(credentials.email, credentials.password));
        });

        it('should throw an error using incorrect email', async () => {
            const credentials = {
                email: 'user@user.com',
                password: 'securepassword'
            };

            const authServiceInstance = new AuthService(UserModel);
            return promiseShouldFail(authServiceInstance.authenticate(credentials.email, credentials.password));
        });
    });
});
