const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const Campsite = require('./models/campsite')
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const jwt = require("jsonwebtoken") // used to create, sign, and verify tokens

const config = require("./config.js");
const { log, error } = require('console');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = user => {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 })
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(
    opts,
    (jwt_payload, done) => {
      console.log("JWT: ", jwt_payload);
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false)
        } else if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    }
  )
)

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next()
  } else {
    res.status(401).json({msg: "Not Authorized"})
  }
}

exports.verifyCommenter = async (req, res, next) => {
  const camp = await Campsite.findById(req.params.campsiteId)

  const comments = camp.comments;

  comments.find((comment) => {
    if (comment.author.toString() === req.user._id.toString()) {
      next()
    } else {
      res.status(401).json({msg: "Not Authorized!"})
    }
  })
}


