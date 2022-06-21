import localStrategy from 'passport-local';
import UserModel from '../Models/Users.js';
import bcrypt from 'bcrypt';

//passport function that handles authentication with server and database
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
//creates a cookie for user
passport.serializeUser(function(user,done) {
    console.log('serialize working')
    done(null, user.id)
})
//decrypts cookie and creates a usable function to call passport user
passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        console.log('deserializer working')
        done(err, user);
    });
});
}

export default InitPassport