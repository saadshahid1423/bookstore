import React, { useState } from 'react'
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IconButton, makeStyles, Table } from '@material-ui/core';


const useStyles = makeStyles({
    icon: {
        width: 'auto'
    }
});

const CollapseRow = (props) => {
    const { item, products, deleteProduct, updateProduct } = props;
    const classes = useStyles();
    const [collapseIsOpen, setCollapseIsOpen] = useState(false);

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={item} >
                <TableCell>
                    <IconButton
                        size="small"
                        className={classes.icon}
                        onClick={() => setCollapseIsOpen(!collapseIsOpen)}
                    >
                        {collapseIsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {products[item]?.title}
                </TableCell>
                <TableCell>
                    {products[item]?.author}
                </TableCell>
                <TableCell>
                    {products[item]?.category}
                </TableCell>
                <TableCell>
                    {products[item]?.stock}
                </TableCell>
                <TableCell>
                    {products[item]?.price}
                </TableCell>
                <TableCell align='center'>
                    <IconButton
                        color="primary"
                        size='small'
                        className={classes.icon}
                        onClick={() => updateProduct(item)}
                    >
                        <EditIcon />
                    </IconButton >
                    <IconButton
                        color="secondary"
                        size='small'
                        className={classes.icon}
                        onClick={() => deleteProduct(item)}
                    >
                        <DeleteIcon />
                    </IconButton >
                </TableCell>
            </TableRow>
            <TableRow style={{ padding: 0, margin: 0 }}>
                <TableCell style={{ padding: 0, margin: 0 }} colSpan={7}>
                    <Collapse in={collapseIsOpen} timeout="auto" unmountOnExit >
                        <Box margin={0} >
                            <Table size="small" aria-label="purchases" style={{ backgroundColor: '#eceff1' }}>
                                <TableRow>
                                    <TableCell style={{ width: 50 }}>Summary:</TableCell>
                                    <TableCell align='justify' >{products[item]?.summary}</TableCell>
                                </TableRow>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </>
    )
}

export default CollapseRow
