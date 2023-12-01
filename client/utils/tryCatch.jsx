import toast from "react-hot-toast"

export const tryCatch = (controller) => async (data) => {
    try {
        const res = await controller(data)
        if (res?.data) {
            toast(res?.data?.message, 'success', 'success')

            return res
        }
    } catch (error) {
        console.log(error)
        const errorMessage = error?.response?.data?.message || error.message
        console.error('Error ' + errorMessage)
        toast(errorMessage)
        // showNotification(errorMessage)
        return
    }
}