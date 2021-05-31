import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import MainApp from '../MainApp';
import Admin from '../Admin/Admin';
import AdminContextProvider from '../context/AdminContext';

const AdminPanel = () => {
    return (
        <AdminContextProvider>
            <Admin />
        </AdminContextProvider>
    )
}

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path='/admin' component={AdminPanel} />
                <Route path='/' component={MainApp} />
            </Switch>
        </Router>
    )
}

export default AppRouter
