import 'mocha';
import chai from 'chai';
chai.should();

import { isShiroRootLvl, isShiro } from '../../../src/shared/utils/utils';

describe('#Utils test', () => {
    describe('-isShiroRootLvl()', () => {
        it('Should return true with root:*', () => {
            const isValid = isShiroRootLvl('root:*');
            isValid.should.be.true;
        });

        it('Should return true with root:sub:*', () => {
            const isValid = isShiroRootLvl('root:sub:*');
            isValid.should.be.true;
        });

        it('Should return false with root', () => {
            const isValid = isShiroRootLvl('root');
            isValid.should.be.false;
        });

        it('Should return false with root:', () => {
            const isValid = isShiroRootLvl('root:');
            isValid.should.be.false;
        });

        it('Should return false with root-sub', () => {
            const isValid = isShiroRootLvl('root-sub');
            isValid.should.be.false;
        });
    });

    describe('-isShiro()', () => {
        it('Should return true with root:read', () => {
            const isValid = isShiro('root:read');
            isValid.should.be.true;
        });

        it('Should return true with root:sub:read', () => {
            const isValid = isShiro('root:sub:read');
            isValid.should.be.true;
        });

        it('Should return false with root:*', () => {
            const isValid = isShiro('root:*');
            isValid.should.be.false;
        });

        it('Should return false with root:sub:*', () => {
            const isValid = isShiro('root:sub:*');
            isValid.should.be.false;
        });
    });
});
