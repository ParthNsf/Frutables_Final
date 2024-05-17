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

const Facilties = () => {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);
    // const [isLoadingData, setIsLoadingData] = useState(false);

    const dispatch = useDispatch();
    const useFacilities = useSelector((state) => state.fruitFacilities);

    // const isLoading = useSelector((state) => state.fruitFacilities.isLoading);

    // useEffect(() => {
    //     dispatch(startLoading())
    //     setTimeout(() => {
    //         dispatch(stopLoading())
    //     })
    // }, [dispatch]);

    // const isLoading = useSelector((state) => state.fruitFacilities.isLoading);
    console.log(useFacilities);


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
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: facilitySchema,
        onSubmit: (values) => {
            if (update) {
                dispatch(editData(values));
            } else {
                const rNo = Math.floor(Math.random() * 1000);
                dispatch(addfacilities({ ...values, id: rNo }));
            }

            handleClose();
            formik.resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
        formik;

    const handleRemove = (id) => {
        dispatch(deleteData(id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    };

    // const Loading = () => {
    //     // <CircularProgress />
    //     dispatch(handleLoading(true))
    // }

    const columns = [
        { field: "name", headerName: "Name", width: 130 },
        { field: "description", headerName: "Description", width: 130 },
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
            {
                useFacilities.isLoading ? <>
                    <br /><br />
                    <LinearProgress />
                    <br />
                    <br />
                    <Box sx={{ width: 300 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>

                </> : <>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open form dialog
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Facilties</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Facility Name"
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
                                    label="Facility Description"
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
                            rows={useFacilities.facility}
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

export default Facilties;
