import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Define validation schema
const categorySchema = object({
  category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'Use a valid name').max(15, 'Use a valid name'),
  description: string().required().min(5, 'Must be 5 characters or more').max(50, 'Must be 50 characters or less'),
});

const AdminCategory = () => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [update, setUpdate] = useState(null);

  const handleAddData = (data) => {
    let localData = JSON.parse(localStorage.getItem('categories')) || [];
    const rNo = Math.floor(Math.random() * 1000);
    localData.push({ ...data, id: rNo });
    localStorage.setItem('categories', JSON.stringify(localData));
    getData();
  };

  const handleEditData = (data) => {
    let localData = JSON.parse(localStorage.getItem('categories')) || [];
    let index = localData.findIndex((item) => item.id === data.id);
    localData[index] = data;
    localStorage.setItem('categories', JSON.stringify(localData));
    getData();
  };

  const formik = useFormik({
    initialValues: {
      category: '',
      description: '',
    },
    validationSchema: categorySchema,
    onSubmit: values => {
      if (update) {
        handleEditData({ ...values, id: update });
      } else {
        handleAddData(values);
      }
      formik.resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUpdate(null);
  };

  const getData = () => {
    let localData = JSON.parse(localStorage.getItem('categories')) || [];
    setRowData(localData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(data.id);
  };

  const handleRemove = (id) => {
    let updateData = rowData.filter((item) => item.id !== id);
    localStorage.setItem('categories', JSON.stringify(updateData));
    setRowData(updateData);
  };

  const columns = [
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 130,
      renderCell: (params) => (
        <Button
          variant="outlined" color="error"
          onClick={() => handleRemove(params.row.id)}
        >
          Remove
          <DeleteIcon />
        </Button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
     width: 100,
      renderCell: (params) => (
        <Button
          variant="contained" color="success"
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
      <h1>AdminCategory</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            helperText={errors.category && touched.category ? errors.category : ' '}
            error={errors.category && touched.category}
            margin="dense"
            id="category"
            name="category"
            label="Enter Category Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.category}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            helperText={errors.description && touched.description ? errors.description : ' '}
            error={errors.description && touched.description}
            margin="dense"
            id="description"
            name="description"
            label="Enter Category Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{update ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default AdminCategory;
