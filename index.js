import bcrypt from "bcrypt"
import express from "express"
import { engine } from "express-handlebars"
import pgPromise from "pg-promise"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import jwt from "jsonwebtoken"
import session from "express-session"
import bodyParser from "body-parser"
import UserTokenService from "./service.js"
import flash from "express-flash"
import jwtTokens from "./utils/jwtTokenHelpers.js"
import authenticateToken from "./midlleware/authorize.js"
import userAuthRoutes from "./routes/userAuth.js"
import userInfo from "./routes/userInfo.js"

// const authirize = authenticateToken()
dotenv.config();
const app = express()
const pgp = pgPromise()

// Define the database connection string
const connectionString = process.env.DATABASE_URL

// Connect to the database using pgp
const db = pgp({ connectionString });

// Setup the Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(cookieParser());
// app.use(authenticateToken);

const corsOptons = { credentials: true, origin: process.env.URL || '*' }

app.use(cors(corsOptons))

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'Razorma',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash())


const userTokenService = UserTokenService(db, bcrypt)
const authRoutes = userAuthRoutes(userTokenService)
const userInfoRoutes = userInfo(userTokenService)

app.get("/",authRoutes.getlogin)
app.get("/signup",authRoutes.getSignup)
app.post("/login", authRoutes.logUser)
app.post("/signup",authRoutes.logUser)
app.get("/welcome",userInfoRoutes.welcome )
app.get("/users", authenticateToken, userInfoRoutes.usersCheck)
// app.post("/welcome", (req, res) => {
//     res.redirect("/welcome")
// })






//Define the port
let Port = process.env.Port || 3010;

//start the app on the port
app.listen(Port, () => {
    console.log(`App Started on Port http://localhost:${Port}`);
});
