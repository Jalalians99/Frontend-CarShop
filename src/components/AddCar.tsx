import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Car } from '../types';

type AddCarProps = {
  fetchCars: () => void;
}

export default function AddCar(props: AddCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({} as Car);

  const handleClickOpen = () => {
    setOpen(true);
    setCar({} as Car);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Add validation
  const addCar = () => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new car");

      return response.json();
    })
    .then(() => props.fetchCars())
    .then(() => setOpen(false))
    .catch(err => console.error(err))
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a new car</DialogTitle>
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
          <Button onClick={() => addCar()}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
