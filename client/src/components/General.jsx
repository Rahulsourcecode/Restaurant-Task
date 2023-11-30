import { Grid } from "@mui/material"
import DetailedView from "./DetailedView"
import ListRestaurants from "./ListRestaurants"
import { useState } from "react";

const General = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const handleListItemClick = (item) => {
        setSelectedItem(item);
    };
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <ListRestaurants onItemClick={handleListItemClick} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <DetailedView selectedItem={selectedItem} />
                </Grid>
            </Grid>
        </div>
    )
}
export default General