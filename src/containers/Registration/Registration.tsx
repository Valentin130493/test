import React, {useEffect} from 'react';
import { SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import { userRegister} from "../../redux/features/userSlice";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../config";

type FormValues = {
    email: string;
    password: string;
};

export const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {error, isAuthenticated} = useAppSelector((state) => state.user);

    useEffect(() => {
        isAuthenticated &&  navigate(routes.default, { replace: true });
    }, [ isAuthenticated ])

    const onSubmit: SubmitHandler<FormValues> = ({email, password}) => {
        dispatch(userRegister({email: email, password: password}));
    }

    return (
        <div style={{width:'100%', display:"flex",alignItems:"center", height:'100vh',justifyContent:'center'}}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input className="form-input" type="email" {...register("email", {
                required: "This is required."
            })} />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input className="form-input" type="password" {...register("password", {
                required: "This is required."
            })} />
            {errors.password && <p className="error">{errors.password.message}</p>}

            {error && <p className="error">{error}</p>}

            <button className="form-btn" type="submit" >Register</button>
            <Link className="link" to={routes.login}>Login</Link>
        </form>
        </div>
    );
};