import { Box, Typography } from "@mui/material"

const DetailedView = ({ selectedItem }) => {
    return (
        <div className="rightsection">
            <Box sx={{ height: '100vh' }}>
                <Box p={3}>
                    <Typography variant="h4" sx={{ fontFamily: 'Lilita One' }}>Detailed view</Typography>
                    {selectedItem ? <Box p={5} sx={{ backgroundColor: '#73B814', minHeight: '200px', color: 'white' }}>
                        <Typography variant="h4">Hotel name:{selectedItem.name}</Typography>
                        <Typography variant="h5">Hotel Contact:{selectedItem.contact}</Typography>
                        <Typography variant="h7">Hotel Address:{selectedItem.address}</Typography>

                    </Box> : <Box height={500} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={"center"}><img src="https://www.iconpacks.net/icons/1/free-hand-cursor-icon-1299-thumb.png" height={200} width={200} alt="" />
                        <Typography variant="h4">Click on a list item to view</Typography></Box>}
                </Box>
            </Box>
        </div>
    )
}

export default DetailedView