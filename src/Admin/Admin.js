import React, { useContext } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Signin from './Signin/Signin';
import Products from './Products/Products';
import { AdminContext } from '../context/AdminContext'
import Discount from './discount/discount';
import { DataProvider } from '../components/Context';

const Admin = () => {

    const { currentUser } = useContext(AdminContext);
    return (
      <DataProvider>

        <Router>
            <Switch>
                <Route exact path={'/admin'} component={Signin} />
                <Route exact path={'/admin/products'} component={currentUser ? Products : Signin} />
                <Route exact path={'/admin/discount'} component={currentUser ? Discount : Signin} />
            </Switch>
        </Router>
      </DataProvider>

    )
}

export default Admin

