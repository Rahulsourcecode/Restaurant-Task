import { tryCatch } from "../utils/tryCatch.js"
import db from "../models/index.js";
const hotelSchema = db.Hotel

export const fetchHotels = tryCatch(async (req, res) => {
    const hotels = await hotelSchema.findAll();
    if (hotels) {
        const data = hotels
        res.status(200).json({ values: hotels })
    } else {
        res.status(400)
    }
})

export const addHotel = tryCatch(async (req, res) => {
    const { name, contact, address } = req.body;
    const newHotel = await hotelSchema.create({
        name,
        contact,
        address,
    });
    if (newHotel) {
        res.status(201).json({ message: 'new hotel added' });
    } else {
        res.status(400).json({ message: 'failed to add' })
    }
})

export const DeletHotel = tryCatch(async (req, res) => {
    const id = req.params.id;
    const deletedRows = await hotelSchema.destroy({
        where: {
            id: id
        }
    });
    if (deletedRows === 0) {
        return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
})

export const updateHotel = tryCatch(async (req, res) => {
    const id = req.params.id;

    const { name, contact, address } = req.body.data
    const existingHotel = await hotelSchema.findOne({
        where: {
            id: id
        }
    });
    if (!existingHotel) {
        return res.status(404).json({ error: 'Hotel not found' });
    }
    // Update the hotel details
    const updatedHotel = await hotelSchema.update(
        {
            name,
            contact,
            address,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            where: {
                id: id
            },
            returning: true,
        }
    );
    console.log(updatedHotel)
    if (updatedHotel[0] === 0) {
        return res.status(500).json({ error: 'Failed to update hotel' });
    }
    res.json({ message: 'Hotel updated successfully' });
});
