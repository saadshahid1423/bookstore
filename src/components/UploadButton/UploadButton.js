import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
}));

export default function UploadButton(props) {
    const classes = useStyles();
    const { name, label, onChange } = props;

    return (
        <>
            <input
                accept="image/*"
                className={classes.input}
                id="upload-input"
                multiple
                type="file"
                name={name}
                onChange={onChange}
            />
            <label htmlFor="upload-input">
                <Button variant="contained" color="primary" component="span">
                    {label}
                </Button>
            </label>
        </>
    );
}