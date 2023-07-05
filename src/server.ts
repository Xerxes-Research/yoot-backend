import { Request, Response } from "express"
import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
import sql from "./db"
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get("/", (_req: Request, res: Response)=>{
    return res.status(200).send("Hello from YOOT API")
})

app.get("/health", async (_req: Request, res: Response)=>{
    try {
        const db_version = await sql` select version() `
        return res.status(200).send(db_version)
    } catch (err) {
        return res.status(500).send(err)
    }

})

app.listen(PORT, async() => {
    const db_version = await sql` select version() `;
    console.log(db_version)
    console.log(`App listening on port ${PORT}`)
})
