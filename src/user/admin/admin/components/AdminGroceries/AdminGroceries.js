import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addGroceries, deleteData, deleteGroceries, editGroceries } from '../../../../../redux/Action/facilities.action';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';

const AdminGroceries = () => {

    const [open, setOpen] = React.useState(false);

    const [update, setUpdate] = useState(false);

    const groceriesData = useSelector((state) => state.groceriesStore);
    console.log(groceriesData)

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
    };

    let foodSchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
        },
        validationSchema: foodSchema,
        onSubmit: async (values) => {
            if (update) {
                dispatch(editGroceries(values));
            } else {
                try {
                    const response = await axios.post('http://localhost:8000/groceries', values);
                    dispatch(addGroceries(response.data));
                } catch (error) {
                    console.error('Error adding groceries:', error);
                }
            }
            handleClose();
            formik.resetForm();
        },

    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

    const handleRemove = (id) => {
        dispatch(deleteGroceries(id))
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: "name", headerName: "Name", width: 130 },
        { field: "description", headerName: "Description", width: 130 },
        { field: "price", headerName: "Price", width: 130 },
        {
            field: "remove",
            headerName: "Remove",
            width: 130,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(params.row.id)}
                >
                    Remove
                    <DeleteIcon />
                </Button>
            ),
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleEdit(params.row)}
                >
                    Edit
                    <BorderColorIcon />
                </Button>
            ),
        },
    ];

    return (
        <>
            <h1>Admin Groceries</h1>


            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Groceries</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Add Food Name"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ""}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Add Food Description"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description ? true : false}
                            helperText={
                                errors.description && touched.description
                                    ? errors.description
                                    : ""
                            }
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="Add Food Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            error={errors.price && touched.price ? true : false}
                            helperText={errors.price && touched.price ? errors.price : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>


            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={groceriesData.groceries}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default AdminGroceries
