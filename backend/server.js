import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config()
// const app = express();



const PORT = process.env.PORT || 5000;

app.use(express.json({limit:"20mb"}));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
}

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get(/.*/, (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


// app.listen(PORT, () => {
server.listen(PORT, () => {
    console.log("Server is running on port :", PORT);
    connectDB();
    
})


