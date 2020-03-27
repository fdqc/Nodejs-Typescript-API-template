import passport from 'passport';
import * as passportJWT from 'passport-jwt';
import { UserModel } from '../models/userSchema';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Define strategy's options
const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// Configure passport with JwtStrategy
passport.use(new JwtStrategy(options, async function (payload, done) {
    const foundUserDoc = await UserModel.findById(payload.id);

    if (foundUserDoc) {
        return done(null, {
            id: foundUserDoc.id
        });
    } else {
        return done(new Error('user_not_found'), false);
    }
}));

/**
 * Returns passport authenticate function
 */
export const jwtAuth = () => {
    return passport.authenticate('jwt', { session: false });
};

