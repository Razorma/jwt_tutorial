import jwtTokens from "../utils/jwtTokenHelpers.js"

export default function userAuthRoutes(userTokenService){
    function getlogin (req, res) {

        res.render("index")
    }
    function getSignup  (req, res) {
        res.render("signUp")
    }

    async function logUser(req, res){
        try {
            const { user_email, password } = req.body
            const user = await userTokenService.logInUser(user_email, password)
            
            if (user) {
                req.session.currentUser = user.username
            }
            const tokens = jwtTokens(user)
            res.cookie("refreshTokens", tokens.refreshToken, { httpOnly: true });
            res.cookie('Custom-Header', tokens.accessToken, { httpOnly: true })
            res.render("welcome", {
                currentUser: req.session.currentUser,
                currentAccessToken: tokens.accessToken,
                currentRefreshToken: tokens.refreshToken
            })
        } catch (error) {
            req.flash("error", error.message)
            res.redirect("/")
        }
    }
    async function signUpUser(req, res) {
        try {
            const { users, user_email, password } = req.body
            await userTokenService.addUser(users, user_email, password)
            req.flash("success", "user successfully added")
            res.redirect("/signUp")
        } catch (error) {
            req.flash("error", error.message)
            res.redirect("/signUp")
        }
    
    }


    return{
        getlogin,
        logUser,
        signUpUser,
        getSignup
    }
}