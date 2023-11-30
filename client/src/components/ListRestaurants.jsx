import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
const ListRestaurants = ({ onItemClick }) => {
    const [open, setOpen] = useState()
    return (
        <>
            <div className="leftSection">
                <Box sx={{ height: '100vh' }}>
                    <Box display={'flex'} justifyContent={'space-evenly'}>
                        <Box p={2} display={"flex"} alignItems={'center'} justifyContent={""}>
                            <img src="https://cdn-icons-png.flaticon.com/512/997/997481.png" height={50} width={50} alt="" />
                            <Typography variant="h4" sx={{ fontFamily: 'Lilita One', color: '#73B814' }}>Resttour</Typography>
                        </Box>
                        <Box p={2} display={"flex"} alignItems={'center'} justifyContent={""}>
                            <Button variant="text" sx={{ color: 'black' }} endIcon={<AddCircleOutlineIcon />}>add</Button>
                        </Box>
                    </Box>
                    <Box p={4}>
                        <List sx={{
                            overflowY: 'scroll',
                            maxHeight: '500px',
                            '&::-webkit-scrollbar': {
                                width: '5px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                                borderRadius: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1',
                                borderRadius: '6px',
                            },
                            '&:hover::-webkit-scrollbar-thumb': {
                                backgroundColor: '#555',
                            },
                        }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, index) => <><ListItem button key={index} sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => onItemClick(val)}>
                                <Box>
                                    <Typography>name</Typography>
                                </Box>
                                <Box>
                                    <Button><EditIcon /></Button>
                                    <Button><DeleteIcon sx={{ color: 'red' }} /></Button>
                                </Box>
                            </ListItem>
                                <Divider />
                            </>
                            )}

                        </List>
                    </Box>
                </Box>
            </div>
        </>

    )
}
export default ListRestaurants