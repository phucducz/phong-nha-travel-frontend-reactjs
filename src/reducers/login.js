import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "~/services";
import { setCurrentUser } from "./user";

const initialState = {
    loading: false,
    status: ''
}

export const login = createAsyncThunk(
    'loginReducer/login',
    async (data, thunkAPI) => {
        const { userName, password, navigate } = data;
        const userLoggedin = await postService('/users/login', { userName: userName, password: password });

        if (typeof userLoggedin.userId === 'number') {
            thunkAPI.dispatch(setCurrentUser(userLoggedin));
            console.log(userLoggedin);
            switch (userLoggedin.roleId) {
                case 1:
                    navigate('/');
                    break;
                case 2:
                    navigate('/admin');
                    break;
                case 3:
                    navigate('/admin');
                    break;
                default:
                    navigate('/');
                    break;
            }

            return 'login successfully!';
        }
        else {
            thunkAPI.dispatch(setCurrentUser({ id: null }));
            return 'wrong username or password!';
        }
    }
);

const loginSlice = createSlice({
    name: 'loginReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.status = 'login failure';
            throw new Error(`${action.error.name}: ${action.error.message}`);
        });
    }
});

export const { reducer: loginReducer } = loginSlice;