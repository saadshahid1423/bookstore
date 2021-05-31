import React from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const MainListItems = () => {
    const history = useHistory();

    return (
        <div>
            <ListItem button>
                <ListItemIcon onClick={() => history.push('/admin/products')}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItem>
            <ListItem button onClick={() => history.push('/admin/members')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
            </ListItem>
            <ListItem button onClick={() => history.push('/admin/reports')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button onClick={() => history.push('/admin/discount')}>
                <ListItemIcon>
                    <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Discount" />
            </ListItem>
        </div>
    )
}

export default MainListItems;