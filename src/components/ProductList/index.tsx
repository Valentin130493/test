import React from 'react';
import {useAppSelector} from "../../redux/store";
import { ProductItem } from "../ProductItem";

export const ProductList = () => {
    const {products, filteredProducts} = useAppSelector((state) => state.products);

    return (
        <>
            {
                filteredProducts.length ?
                    filteredProducts.map((item) => <ProductItem key={item.uid} {...item}/>) :
                    products.map((item) => <ProductItem key={item.uid} {...item}/>)
            }
        </>
    );
};