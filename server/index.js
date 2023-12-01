import express from 'express';
const app = express()
import cors from 'cors'
import { configDotenv } from 'dotenv'
import sequelize from './configurations/sequalize.js';
import router from './routes/generalRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
configDotenv();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],
}));
app.use(express.json())
app.use(express.urlencoded())
app.use(errorHandler);
const PORT = process.env.PORT || 5000
app.use("/api/general", router)
app.listen(PORT, () => console.log(`connected to port ${PORT}`))

