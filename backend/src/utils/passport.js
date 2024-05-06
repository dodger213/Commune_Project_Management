// Importing Passport, strategies, and config
const passport = require('passport')
const { model } = require('mongoose')
const User = require('../models/user.model')
const config = require('./config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // return done(false)
    User.findOne({ email: payload.email }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(false);
        }
    });
});

passport.use(jwtLogin);
