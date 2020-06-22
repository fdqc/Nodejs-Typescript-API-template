import 'mocha';
import chai from 'chai';
chai.should();

import sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';
import { checkPermissions } from '../../src/middleware/permissionsMiddleware';

describe('#Middleware', () => {
    describe('-checkPermissions()', () => {
        it(`Next should be called with required permissions ['root:read'] and
            req.user permissions = [root:*, 'other:*']`, () => {
            const middleware = checkPermissions(['root:read']);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const nextSpy = sinon.spy();

            req.user = { _id: '', permissions: ['root:*', 'other:*'] };

            middleware(req, res, nextSpy);
            nextSpy.calledOnce.should.be.true;
        });

        it(`Next should be called with required permissions ['root:read'] and
            req.user permissions = [root:read, 'other:*']`, () => {
            const middleware = checkPermissions(['root:read']);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const nextSpy = sinon.spy();

            req.user = { _id: '', permissions: ['root:read', 'other:*'] };

            middleware(req, res, nextSpy);
            nextSpy.calledOnce.should.be.true;
        });

        it(`Next should be called with required permissions
            ['root:read', 'other:write'] and
            req.user permissions = [root:read, 'other:*']`, () => {
            const middleware = checkPermissions(['root:read', 'other:write']);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const nextSpy = sinon.spy();

            req.user = { _id: '', permissions: ['root:read', 'other:*'] };

            middleware(req, res, nextSpy);
            nextSpy.calledOnce.should.be.true;
        });

        it(`Next should throw with required permissions ['root:write'] and
            req.user permissions = [root:read, 'other:*']`, () => {
            const middleware = checkPermissions(['root:write']);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const nextSpy = sinon.spy();

            req.user = { _id: '', permissions: ['root:read', 'other:*'] };

            try {
                middleware(req, res, nextSpy);
            } catch (error) {
                error.message.should.equal('unauthorized');
            }
        });

        it(`Next should throw with required permissions
            ['root:write', 'other:write'] and
            req.user permissions = [root:read, 'other:read']`, () => {
            const middleware = checkPermissions(['root:write', 'other:write']);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const nextSpy = sinon.spy();

            req.user = { _id: '', permissions: ['root:read', 'other:read'] };

            try {
                middleware(req, res, nextSpy);
            } catch (error) {
                error.message.should.equal('unauthorized');
            }
        });
    });
});
