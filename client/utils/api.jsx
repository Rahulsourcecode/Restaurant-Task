import Axios from "./Axios"
import { tryCatch } from "./tryCatch"

export const fetchData = tryCatch(async () => {
    const res = await Axios.get("/general/get-hotels")
    return res
})

export const deleteHotel = tryCatch(async (data) => {
    console.log(data)
    const res = await Axios.delete(`/general/delete-hotels/${data}`)
    return res
})
export const updateHotel = tryCatch(async (data) => {
    console.log(data)
    const res = await Axios.patch(`/general/update-hotels/${data.id}`, data)
    return res
})

export const addHotel = tryCatch(async (data) => {
    const res = await Axios.post("/general/add-hotel", data)
    console.log(res)
    return res
})