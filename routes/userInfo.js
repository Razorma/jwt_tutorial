export default function userInfo(userTokenService){
    function welcome(req, res) {

        res.render("welcome", {
            currentUser: req.session.currentUser,
            currentUserToken: req.session.currentUserToken,
    
        })
    }
    async function usersCheck (req, res) {

        try {
            const users = await userTokenService.getUsers()
    
            res.render("users", {
                users
            })
        } catch (error) {
            req.flash("error", error.message)
            res.redirect("/welcome")
        }
    }

    return{
        welcome,
        usersCheck
    }
}