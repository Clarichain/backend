import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config"

//router imports
import contractRoutes from "./routes/contract.route"

//defining App
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
    credentials: true, //for cookie access
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type"] //add as required
}))

//default middleware
app.use(express.json());
app.use(cookieParser());

//setting forced garbage collection for optimization
setInterval(()=>{
    if(global.gc){
        global.gc()
        console.log("Forced garbage collection")
    }
}, 6000);

//app routes
///Authentication will be handled on the frontend except for encryption and decryption of keys
///Backend authentication is redacted but implementations will not be deleted
// app.use('/auth', authRoutes);

app.use('/contracts', contractRoutes)

//process events

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));