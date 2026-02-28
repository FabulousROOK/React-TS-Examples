import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import React, { useState } from "react";
import Box from "@mui/material/Box";

type InventoryItem = {
  name: string;
  type: string;
  quantity: number;
  unit: string;
  category: string;
};

type Props = {
  onAdd?: (item: InventoryItem) => void;
};

const unitOptions = ["pcs", "kg", "g", "l", "ml"];
const categoryOptions = [
  "Electronics",
  "Consumables",
  "Tools",
  "Stationery",
  "Other",
];

const AddInventory = ({ onAdd }: Props) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    quantity: 0,
    unit: "",
    category: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InventoryItem, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    e.preventDefault();
    const name = e.target.name as keyof InventoryItem
    const value = e.target.value
    setForm(prev => ({...prev, [name]: name === "quantity" ? Number(value): value}))
  };

  const validdate = () => {
    const next: Partial<Record<keyof InventoryItem, string>> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.type.trim()) next.type = "Type is required";
    if (!form.quantity || form.quantity <= 0)
      next.quantity = "Quantity must be greater than 0";
    if (!form.unit) next.unit = "Measuring unit is required";
    if (!form.category) next.category = "Category is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validdate()) return;
    const payload = { ...form };
    if (onAdd) onAdd(payload);
    else console.log("Added inventory item:", payload);
    setForm({ name: "", type: "", quantity: 0, unit: "", category: "" });
    setErrors({});
  };

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <TextField
          id="outlined-basic"
          label="Type"
          name="type"
          variant="outlined"
          value={form.type}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.type}
          helperText={errors.type}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <FormControl fullWidth required error={!!errors.unit}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.category}
            onChange={handleChange}
            name="category"
            label="category"
            //onChange={handleChange}
          >
            {categoryOptions.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <TextField
          id="outlined-basic"
          label="Quantity"
          name="quantity"
          type="number"
          variant="outlined"
          value={form.quantity}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <FormControl fullWidth required error={!!errors.unit}>
          <InputLabel id="demo-simple-select-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.unit}
            onChange={handleChange}
            name="unit"
            label="unit"
          >
            {unitOptions.map((unit) => (
              <MenuItem value={unit} key={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" type="submit">
            Add Item
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddInventory;
