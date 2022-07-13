import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {firebaseAuth, firebaseCreateUser, firebaseSignOut} from "../../services/firebaseServices";

interface UserDataProps {
    email: string,
    password: string
}

export interface UserState {
    loading: boolean,
    error: any,
    userInfo: any | null,
    isAuthenticated: boolean
}

export const userLogin = createAsyncThunk(
    'user/login',
    async (userData: UserDataProps, thunkAPI) => {
        try {
            return await firebaseAuth(userData.email, userData.password);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)

export const userSignOut = createAsyncThunk(
    'user/signOut',
    async (_, thunkAPI) => {
        try {
            return await firebaseSignOut();
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error})
        }
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async (userData: UserDataProps, thunkAPI) => {
        try {
            return await firebaseCreateUser(userData.email, userData.password);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)

const initialState: UserState = {
    userInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            userLogin.pending, (state) => {
                state.loading = true;
                state.userInfo = null;
                state.isAuthenticated = false;
        });
        builder.addCase(
            userLogin.fulfilled, (state, {payload}) => {
                state.userInfo = {...payload};
                state.isAuthenticated = true;
                state.loading = false;
            });
        builder.addCase(
            userLogin.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error;
            });
        builder.addCase(
            userRegister.pending, (state) => {
                state.loading = true;
                state.userInfo = null;
                state.isAuthenticated = false;
            });
        builder.addCase(
            userRegister.fulfilled, (state, {payload}) => {
                state.userInfo = payload?.user;
                state.isAuthenticated = true;
                state.loading = false;
            });
        builder.addCase(
            userRegister.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
            });
        builder.addCase(
            userSignOut.pending, (state) => {
                state.loading = true;
                state.userInfo = null;
                state.isAuthenticated = false;
            });
        builder.addCase(
            userSignOut.fulfilled, (state, {payload}) => {
                state.loading = false;
            });
        builder.addCase(
            userSignOut.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
            });
    }
})

export default userSlice.reducer