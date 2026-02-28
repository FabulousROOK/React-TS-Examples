import React from "react";
import Grid from "@mui/material/Grid";
import AddInventory from "../../components/inventory/AddInventory";

const handleInvetoryForm = (item: any) => {

}

const InventoryControls = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <AddInventory/>
      </Grid>
      
    </Grid>
  );
};

export default InventoryControls;
