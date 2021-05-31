import { createContext, useState, useEffect } from "react";
import firebase from '../fire';
import storage from '../utils/storageService';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            storage.set('currentUser', user)
        });
        setCurrentUser(storage.get('currentUser'));

    }, []);

    return (
        <AdminContext.Provider value={{ currentUser, setCurrentUser }} >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
