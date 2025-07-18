import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config"

//router imports
import userRoutes from "./routes/user.route"
import lucidRoutes from "./routes/lucid.route";
import { run_checks } from "./config/lucid";

run_checks();

//
const app = express()
const allowedOrigins = [
    'localhost:3000', //development
]

//safeguarding cors
app.use(cors({
    origin: function (origin, callback: Function){
        //bypasses requests with no origin
        if(!origin) return callback(null, true);

        //check if origin does not exist
        if (allowedOrigins.indexOf(origin) === -1){
            var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false)
        }

        //allow access if origin exists
        return callback(null, true)
        
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type"] //add as required
}))

app.use(express.json());
app.use(cookieParser());

//setting forced garbage collection for optimization
setInterval(()=>{
    if(global.gc){
        global.gc()
        console.log("Forced garbage collection")
    }
}, 6000)

//app routes
app.use('/user', userRoutes)
app.use('/lucid', lucidRoutes)
//process events

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))