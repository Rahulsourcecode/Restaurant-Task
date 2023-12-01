import express from "express";
import { DeletHotel, addHotel, fetchHotels, updateHotel } from "../controllers/generalController.js";
const router = express.Router()

router.get('/get-hotels', fetchHotels)
router.post('/add-hotel', addHotel)
router.delete("/delete-hotels/:id", DeletHotel)
router.patch("/update-hotels/:id", updateHotel)

export default router;