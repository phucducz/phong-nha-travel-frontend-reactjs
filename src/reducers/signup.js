import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "~/services";
import { login } from "./login";

const initialState = {
    loading: false,
    status: ''
}

export const signUp = createAsyncThunk(
    'signUpReducer/signUp',
    async (data, thunkAPI) => {
        const { userName, password, phoneNumber, email, firstName, lastName, navigate } = data;
        const isSignedSuccess = await postService(
            'users',
            { userName, password, phoneNumber, email, active: 1, roleId: 1, firstName, lastName },
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (isSignedSuccess.status === 200) {
            thunkAPI.dispatch(login({ userName, password, navigate }));
            return 'sign up successfully!';
        }
        else if (isSignedSuccess.status === 409)
            return 'email or userName already exist!';
        else return 'sign up failure!';
    }
)

const signUpSlice = createSlice({
    name: 'signUpReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.status = 'sign up failure!';
            throw new Error(`${action.error.name}: ${action.error.message}`);
        })
    }
});

export const { reducer: signUpReducer } = signUpSlice;