import { Grid, Paper, makeStyles, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout';
import ProductList from './ProductList';
import db from '../../fire';
import AddIcon from '@material-ui/icons/Add';
import { usePopup } from '../../components/Popup/Popup'
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    button: {
        width: 100,
        marginBottom: theme.spacing(1),
        alignSelf: 'flex-end',
    }
}));

const Products = () => {

    const classes = useStyles();
    const { open, togglePopup } = usePopup();

    const [updateProductOpen, setUpdateProductOpen] = useState(false);
    const [products, setProducts] = useState({});
    const [currentProduct, setCurrentProduct] = useState(null);

    const getData = async () => {
        try {
            await db.database().ref('Books').on('value', snaphot => {
                if (snaphot.val()) {
                    setProducts({ ...snaphot.val() });
                }
                else {
                    setProducts({});
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        getData()
    }, [])

    const addProduct = () => {
        togglePopup();
    }

    const updateProduct = (item) => {
        setUpdateProductOpen(prev => !prev);
        setCurrentProduct({ ...products[item], id: item })
    }

    const toggleUpdatePopup = () => setUpdateProductOpen(prev => !prev)

    return (
        <AdminLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            startIcon={<AddIcon />}
                            color='primary'
                            onClick={addProduct}
                        >
                            Add
                        </Button>
                        <ProductList {...{ products, updateProduct }} />
                        <AddProduct {...{ open, togglePopup }} />
                        <UpdateProduct
                            open={updateProductOpen}
                            togglePopup={toggleUpdatePopup}
                            currentProduct={currentProduct}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default Products
