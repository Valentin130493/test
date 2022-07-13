import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchProducts} from "../../redux/features/productsSlice";
import {userSignOut} from "../../redux/features/userSlice";
import {useNavigate} from "react-router-dom";

import "./Product.css"
import {routes} from "../../config";
import {ProductList, Filters} from "../../components";

export const Products = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {userInfo} = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const handleSignOutUser = () => {
        dispatch(userSignOut())
        navigate(routes.login, {replace: true});
    }

    return (
        <div>
            <div className={"user-info"}>
                <p className={"user-info-p"}>user: {userInfo?.user?.email}</p>
                <button className={"user-info-logout"} onClick={handleSignOutUser}>logout</button>
            </div>
            <div>
                <div className={"section-filters"}>
                    <p>filters</p>
                    <Filters/>
                </div>
                <div className={"section"}>
                    <ProductList/>
                </div>
            </div>
        </div>
    );
};