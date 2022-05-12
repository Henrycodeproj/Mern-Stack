import localStrategy from 'passport-local';
import UserModel from '../Models/Users.js';
import bcrypt from 'bcrypt';

function InitPassport(passport) {
    passport.use(new localStrategy({usernameField: 'login_username', passwordField: 'login_password'},
        function (username,password,done) {
            UserModel.findOne({username:username}, (err, user) => {
                if (err) throw err
                if (!user) return done(null, false, {message:'This user does not exist'})
                bcrypt.compare(password, user.password, (err, result) =>{
                    if (err) throw err;
                    if (!result) return done(null, false, {message:'Your password is incorrect'})
                    else if (result && !user.isVerified) return done(null, false, {message: 'Your account is not verified'})
                    else {
                        return done(null, user, {message:'Logging in...'})
                    }
                })
            })
        }
    ))
passport.serializeUser(function (user, done) {
    done(null, user._id) // the user id that you have in the session
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, (err, user)=>{
        done(err, user)
    })
});
}

export default InitPassport