import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Car, CarData } from '../types';

type EditCarProps = {
  data: CarData;
  fetchCars: () => void;
}

export default function EditCar(props: EditCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({} as Car);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data);
    setCar({
      brand: props.data.brand,
      model: props.data.model,
      color: props.data.color,
      fuel: props.data.fuel,
      modelYear: props.data.modelYear,
      price: props.data.price,
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch(props.data._links.self.href, {
      method: 'PUT',
      headers: { "content-type" : "application/json"},
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when updating car");

      return response.json();
    })
    .then(() => props.fetchCars())
    .catch(err => console.error(err))
    .finally(() => handleClose());
  }

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update car</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="brand"
            value={car.brand}
            label="Brand"
            onChange={event => setCar({...car, brand: event.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="model"
            value={car.model}
            label="Model"
            onChange={event => setCar({...car, model: event.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="color"
            value={car.color}
            label="Color"
            onChange={event => setCar({...car, color: event.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="fuel"
            value={car.fuel}
            label="Fuel"
            onChange={event => setCar({...car, fuel: event.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="modelYear"
            value={car.modelYear}
            label="Model Year"
            type="number"
            onChange={event => setCar({...car, modelYear: Number(event.target.value) })}
            fullWidth
            variant="standard"
          />
         <TextField
            required
            margin="dense"
            name="price"
            value={car.price}
            label="Price (€)"
            type="number"
            onChange={event => setCar({...car, price: Number(event.target.value) })}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
