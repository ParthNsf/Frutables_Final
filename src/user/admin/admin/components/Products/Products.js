import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string, number, date, InferType } from "yup";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import {
    addfacilities,
    deleteData,
    editData,
} from "../../../../../redux/Action/facilities.action";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { addProducts, editProducts, fetchProducts, removeProducts } from "../../../../../redux/Action/products.action";

const Products = () => {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const productsData = useSelector((state) => state.productInAdmin);
    console.log(productsData.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        formik.resetForm();
    };

    let facilitySchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
        },
        validationSchema: facilitySchema,
        onSubmit: (values) => {
            if (update) {
                dispatch(editProducts(values));
            } else {
                dispatch(addProducts({ ...values }));
            }

            handleClose();
            formik.resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
        formik;

    const handleRemove = (id) => {
        dispatch(removeProducts(id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    };

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
            <h1>Products In Admin</h1>

            {
                productsData.isLoading ?
                    <>
                        <LinearProgress />
                        <Box sx={{ width: 300 }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    </>
                    :
                    productsData.error ? <div>{productsData.error}</div> :
                        <>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Open form dialog
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Products</DialogTitle>
                                <form onSubmit={handleSubmit}>
                                    <DialogContent>
                                        <TextField
                                            margin="dense"
                                            id="name"
                                            name="name"
                                            label="Add Product Name"
                                            type="text"
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
                                            label="Add Product Description"
                                            type="text"
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
                                            label="Add Product Price"
                                            type="text"
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
                                            <Button type="submit">{update ? "Update" : "Add"}</Button>
                                        </DialogActions>
                                    </DialogContent>
                                </form>
                            </Dialog>

                            <br />
                            <br />



                            <div style={{ height: 400, width: "100%" }}>

                                <DataGrid
                                    rows={productsData.products}
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
            }


        </>
    );
};

export default Products;
