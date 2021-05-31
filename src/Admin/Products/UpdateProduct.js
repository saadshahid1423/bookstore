import { Button, Grid, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { Popup } from '../../components/Popup/Popup'
import { useFormik } from 'formik';
import db from '../../fire';
import UploadButton from '../../components/UploadButton/UploadButton';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const UpdateProduct = (props) => {
    const { open, togglePopup, currentProduct } = props;
    const classes = useStyles();
    const [file, setFile] = useState(null);

    const onSubmit = async (values) => {
        let coverUrlWeb;

        if (file) {
            const fileRef = await db.storage().ref('BookCovers').child(file?.name);
            await fileRef.put(file);
            coverUrlWeb = await fileRef.getDownloadURL();
            if (currentProduct.imageName) {
                await db.storage().ref('BookCovers/' + currentProduct?.imageName).delete();
            }
        }

        const newValue = { ...values, ...(coverUrlWeb && { coverUrlWeb, imageName: file?.name }) }

        await db.database().ref('Books/' + currentProduct.id).set(newValue, (error) => {
            if (error) {
                console.log(error);
            } else {
                alert('Succesfully');
                togglePopup();
            }
        });

    }

    const handleUpload = (e) => {
        let selected = e.target?.files[0];
        setFile(selected);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: currentProduct,
        onSubmit
    });

    return (
        <Popup
            open={open}
            togglePopup={togglePopup}
            autoClose={false}
            title='Update Product'
            maxWidth='xs'
        >
            <form noValidate className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Name"
                            autoFocus
                            size='small'
                            value={formik.values?.title}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="author"
                            label="Author"
                            name="author"
                            autoComplete="author"
                            size='small'
                            value={formik.values?.author}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            autoComplete="category"
                            size='small'
                            value={formik.values?.category}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="stock"
                            label="Stock"
                            type="number"
                            id="stock"
                            autoComplete="stock"
                            size='small'
                            value={formik.values?.stock}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            type="number"
                            id="price"
                            autoComplete="price"
                            size='small'
                            value={formik.values?.price}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            name="summary"
                            label="Summary"
                            type="number"
                            id="summary"
                            autoComplete="summary"
                            size='small'
                            value={formik.values?.summary}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UploadButton
                            name='imageFile'
                            label='Upload Image'
                            onChange={handleUpload}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Submit
                </Button>
            </form>
        </Popup>
    )
}

export default UpdateProduct
