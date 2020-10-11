import 'reflect-metadata';
import { Container } from 'typedi';
import { UserModel } from '../../src/models/userSchema';

import express from 'express';
import expressLoader from '../../src/loaders/express';
import request from 'supertest';
import config from '../../src/config/config';

import chai from 'chai';
chai.should();

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

const app = express();

let mongoServer: MongoMemoryServer;
const opt = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

before('##Start MongoMemoryServer', async () => {
    mongoServer = new MongoMemoryServer({ binary: { version: '4.2.5' } });
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opt);

    Container.set('userModel', UserModel);
    await expressLoader(app);
});

after('##Disconnect and stop server', async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('#Auth', () => {
    describe.only('##Register', () => {
        it('Should register a user and return a token', async () => {
            await request(app)
                .post(`${config.routePrefix}/auth/register`)
                .send({
                    name: 'test user',
                    email: 'user@test.com',
                    password: 'securepassword'
                })
                .expect(res => {
                    (res.body.token).should.exist;
                })
                .expect(201);
        });

        it('Should not register the user with error email_already_taken', async () => {
            await request(app)
                .post(`${config.routePrefix}/auth/register`)
                .send({
                    name: 'test user',
                    email: 'user@test.com',
                    password: 'securepassword'
                })
                .expect(res => {
                    const parsed = JSON.parse(res.text);
                    (parsed.errors[0].msg).should.equal('email_already_taken');
                })
                .expect(400);
        });
    });
});
