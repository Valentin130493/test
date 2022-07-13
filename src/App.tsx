import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Login, Products, Registration} from './containers';
import {routes} from "./config";
import {PrivateRoute} from "./components";

function App() {
    return (
        <div >
            <Routes>
                <Route path={routes.login} element={<Login/>}/>
                <Route path={routes.register} element={<Registration/>}/>
                <Route path={routes.default} element={
                    <PrivateRoute>
                        <Products/>
                    </PrivateRoute>
                }/>
            </Routes>
        </div>
    );
}

export default App;
