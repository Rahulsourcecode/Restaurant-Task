import express from 'express';
const app = express()
import { configDotenv } from 'dotenv'
import { connection } from './configurations/dbConfig.js';
configDotenv();


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`connected to port ${PORT}`))

