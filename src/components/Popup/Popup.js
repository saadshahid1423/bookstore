import { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, Typography, IconButton, makeStyles, } from "@material-ui/core";
import CloseIcon from "@material-ui//icons/Close";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    closeIcon: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        width: 'auto',
    },
    modalContent: {
        outline: 'none',
    },
    title: {
        marginRight: theme.spacing(5),
    },
}));

export const usePopup = () => {
    const [open, setOpen] = useState(false);

    const togglePopup = () => setOpen(prev => !prev)

    return {
        open,
        togglePopup
    }
}

export const Popup = (props) => {

    const {
        open,
        togglePopup,
        children,
        buttons,
        title,
        customHeader,
        customFooter,
        closeIcon = true,
        autoClose = true,
        scroll = 'paper',
        maxWidth = 'sm',
        dividers = true,
        fullWidth = false
    } = props

    const descriptionElementRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={autoClose && togglePopup}
            scroll={scroll}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            <DialogTitle disableTypography >
                {customHeader || <Typography variant="h6" align='center' className={classes.title}>{title}</Typography>}
                {closeIcon &&
                    <IconButton
                        aria-label="close"
                        className={classes.closeIcon}
                        onClick={togglePopup}
                    >
                        <CloseIcon />
                    </IconButton>}
            </DialogTitle>
            <DialogContent
                dividers={dividers}
                ref={descriptionElementRef}
                tabIndex={-1}
                className={classes.modalContent}
            >
                {children}
            </DialogContent>
            {   buttons ?
                (<DialogActions>
                    {buttons}
                </DialogActions>) :
                customFooter
            }
        </Dialog >
    );
}

Popup.propsTypes = {
    title: PropTypes.string,
    closeIcon: PropTypes.bool,
    autoClose: PropTypes.bool,
    scroll: PropTypes.oneOf(['paper', 'body']),
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    dividers: PropTypes.bool,
    buttons: PropTypes.element,
    children: PropTypes.node.isRequired,
    togglePopup: PropTypes.func,
    open: PropTypes.bool,

}
Popup.defaultProps = {
    title: 'Title',
    closeIcon: true,
    autoClose: true,
    scroll: 'paper',
    maxWidth: 'sm',
    dividers: true
}


