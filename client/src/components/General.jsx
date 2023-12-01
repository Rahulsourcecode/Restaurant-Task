import { Grid } from "@mui/material"
import DetailedView from "./DetailedView"
import ListRestaurants from "./ListRestaurants"
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

const General = () => {
    const [hotelData, setHotelData] = useState([])
    const [changes, setChanges] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const handleListItemClick = (item) => {
        setSelectedItem(item);
    };
    useEffect(() => {
        fetchData()
            .then((data) => setHotelData(data.data.values))

    }, [changes])
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <ListRestaurants onChangeitems={setChanges} data={hotelData} onItemClick={handleListItemClick} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <DetailedView diffs={changes} selectedItem={selectedItem} />
                </Grid>
            </Grid>
        </div>
    )
}
export default General