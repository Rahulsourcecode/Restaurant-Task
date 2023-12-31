import { Box, Button, Divider, Grid, List, ListItem, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { addHotel, deleteHotel, updateHotel } from "../../utils/api";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    contact: Yup.number().required('Contact number is required').positive('Contact number must be positive'),
    address: Yup.string().required('Address is required'),
});

const ListRestaurants = ({ onItemClick, data, onChangeitems }) => {
    const [open, setOpen] = useState(false);
    const [editOption, setEditOption] = useState(false);
    const [id, SetID] = useState(null);
    const inital = {
        name: "",
        contact: "",
        address: "",
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            contact: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (editOption) {
                HandleEditSubmit();
            } else {
                HandelSubmit();
            }
        },
    });

    const handleOpen = () => {
        setOpen(true);
        setEditOption(false);
        formik.resetForm();

    };

    function handleClose() {
        setOpen(false);
        setEditOption(false);
        setHotelData(inital);
    }

    const [hotelData, setHotelData] = useState({
        name: "",
        contact: "",
        address: "",
    });

    function HandleChange(e) {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
        formik.handleChange(e);
    }

    function HandelSubmit() {
        onChangeitems(false);
        addHotel(hotelData)
            .then(() => {
                setHotelData(inital);
                onChangeitems((prev) => !prev);
                handleClose();
            })
            .catch((err) => console.log(err));
    }

    function HandleDelete(id) {
        const status = window.confirm("Are you sure?");
        if (status) {
            deleteHotel(id)
                .then(() => {
                    onChangeitems((prev) => !prev);
                });
        }
    }

    function HandleEdit(id) {
        const selectedHotel = data.find((val) => val.id === id);
        setHotelData({
            name: selectedHotel.name || "",
            contact: selectedHotel.contact || "",
            address: selectedHotel.address || "",
        });
        setEditOption(true);
        setOpen(true);
        SetID(id);
    }

    function HandleEditSubmit() {
        const values = {
            id: id,
            data: hotelData,
        };
        updateHotel(values)
            .then(() => {
                setHotelData(inital);
                onChangeitems((prev) => !prev);
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
                            <Button variant="text" sx={{ color: 'black' }} endIcon={<AddCircleOutlineIcon />}
                                onClick={() => handleOpen()}>add</Button>
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
                            {data.map((val) => <>
                                <ListItem button key={val.id} sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => onItemClick(val)}>
                                    <Box>
                                        <Typography>{val.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Button onClick={() => HandleEdit(val.id)}><EditIcon /></Button>
                                        <Button onClick={() => HandleDelete(val.id)}><DeleteIcon sx={{ color: 'red' }} /></Button>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </>
                            )}

                        </List>
                    </Box>
                </Box>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ mb: 5 }} id="modal-modal-title" variant="h6" component="h2">
                        Add A Restaurent
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <label>Enter A Name</label>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={formik.values.name || hotelData.name}
                                    onChange={HandleChange}
                                    onBlur={formik.handleBlur}
                                    name="name"
                                    fullWidth
                                    type="text"
                                />
                                <Typography color="error">{formik.touched.name && formik.errors.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <label>Enter Number</label>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={formik.values.contact || hotelData.contact}
                                    onChange={HandleChange}
                                    onBlur={formik.handleBlur}
                                    name="contact"
                                    fullWidth
                                    type="number"
                                />
                                <Typography color="error">{formik.touched.contact && formik.errors.contact}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <label>Enter Address</label>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={formik.values.address || hotelData.address}
                                    onChange={HandleChange}
                                    onBlur={formik.handleBlur}
                                    name="address"
                                    multiline
                                    fullWidth
                                    type="text"
                                    rows={4}
                                />
                                <Typography color="error">{formik.touched.address && formik.errors.address}</Typography>
                            </Grid>
                            <Grid mt={5} item xs={12} display={'flex'} justifyContent={'space-between'}>
                                <Button variant="contained" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="contained" type="submit">
                                    {editOption ? 'Update' : 'Add'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ListRestaurants;
