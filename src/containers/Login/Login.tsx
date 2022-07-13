import React, {useEffect} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {userLogin} from "../../redux/features/userSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../config";

import "./LoginForm.css"

type FormValues = {
    email: string;
    password: string;
};

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useAppSelector((state) => state.user);

    useEffect(() => {
        isAuthenticated &&  navigate(routes.default, { replace: true });
    }, [ isAuthenticated ])

    const onSubmit: SubmitHandler<FormValues> = ({email, password}) => {
        dispatch(userLogin({email: email, password: password}));
    }

    return (
        <div style={{width:'100%', display:"flex",alignItems:"center", height:'100vh',justifyContent:'center'}}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input className="form-input" type="email" {...register("email", {
                required: "This is required."
            })} />
            {errors.email && <p className="error"> {errors.email.message}</p>}

            <input className="form-input" type="password" {...register("password", {
                required: "This is required."
            })} />
            {errors.password && <p className="error">{errors.password.message}</p>}

            {error && <p className="error" >{error}</p>}

            <button className="form-btn" type="submit" >Login</button>
            <Link className="link" to={routes.register}>Register</Link>
        </form>
        </div>
    );
};