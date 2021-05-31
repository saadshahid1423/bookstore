import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, IconButton, Paper } from '@material-ui/core';

import ProductForm from './AddProduct';
import db from '../../fire';
import CollapseRow from '../../components/CollapseRow/CollapseRow';


const columns = [
    {
        id: 'detail',
        label: 'Detail',
        maxWidth: 5
    },
    {
        id: 'title',
        label: 'Name',
        minWidth: 120
    },
    {
        id: 'author',
        label: 'Author',
        minWidth: 120
    },
    {
        id: 'category',
        label: 'Category',
        minWidth: 100
    },
    {
        id: 'stock',
        label: 'Stock',
        minWidth: 50,
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 50,
        format: (value) => value.toFixed(2),
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Actions',
        minWidth: 20,
        align: 'center'
    },

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 460,
    },
    icon: {
        width: 'auto'
    }
});


const ProductList = (props) => {
    const classes = useStyles();
    const { products, updateProduct } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteProduct = (item) => {
        if (window.confirm('Are you sure to delete this record?')) {
            db.database().ref('Books').child(item).remove()
                .then(() => alert("Remove succeeded."))
                .catch(error => console.log("Remove failed: " + error.message));
        }
    }

    return (
        <>
            <TableContainer className={classes.container}>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(products).reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                            return (
                                <CollapseRow {...{ products, item, deleteProduct, updateProduct }} />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[10, 25, 100]}
                count={Object.keys(products).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}

export default ProductList;