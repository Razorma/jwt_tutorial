export default function UserTokenService(db,bcrypt){
    async function addUser(username,email,password){

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const addUserQuery = `
        INSERT INTO users(username,email,password)
        VALUES($1,$2,$3);
        `
        await db.none(addUserQuery,[username,email,hashedPassword])

    }
    // await addUser('bheka',"email@gmail.com",'ilovetokens')
    async function logInUser(email,password){
        const checkPasswordQuery = `
        SELECT * 
        FROM users
        WHERE email = $1;
        `
        const userInfo = await db.oneOrNone(checkPasswordQuery,[email])

        if(!userInfo){
            throw new Error ("User not found")
        }
        const storedPassword = userInfo.password;
     
        
        //Check if the password matches
        const passwordMatch = await bcrypt.compare(password, storedPassword)

        //Return role if password is correct and throw error if they dont match
        if (passwordMatch) {
            
            return userInfo
                
        } else {
            throw new Error("Incorrect password");
        }

    }
    async function getUsers(){
        return await db.manyOrNone(`SELECT * FROM users;`)

    }
   return {
    addUser,
    logInUser,
    getUsers
   }
}