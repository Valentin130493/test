import React from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setFilter} from "../../redux/features/productsSlice";

import './Filtres.css';

export const Filters = () => {
    const {productTypes} = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    const handleSetFilter = (product: string) => dispatch(setFilter({product: product}))

    return (
        <div className="filters-container">
            {productTypes.map((product, id) => (
                <div key={product + id}>
                    <input
                        onClick={() => handleSetFilter(product)}
                        type="checkbox"
                        id={product + '-id'}
                    />
                    {product}
                </div>
            ))}
        </div>
    );
};