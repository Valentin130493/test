import React from 'react';
import {Navigate} from 'react-router-dom';
import {routes} from "../../config";
import {useAppSelector} from "../../redux/store";

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({children}) => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={routes.login} replace/>
    }

    return children;
}
