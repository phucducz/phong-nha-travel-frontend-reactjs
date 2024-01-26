import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService, putService } from "~/services";

const initialState = {
    userList: [],
    userActive: -1,
    currentUser: {},
    loading: false,
    status: ''
}

export const saveChangesUser = createAsyncThunk(
    'userReducer/saveChangesUser',
    async (data) => {
        console.log(data);
        const response = await postService('users',
            { ...data },
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        return response.message;
    }
)

export const saveChangesProfile = createAsyncThunk(
    'userReducer/saveChangesProfile',
    async (data, thunkAPI) => {
        const response = await postService('users',
            { ...data.newUserInfo, active: 1, firstName: data.oldUserInfo.firstName, lastName: data.oldUserInfo.lastName },
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
            thunkAPI.dispatch(setCurrentUser({
                ...data.oldUserInfo,
                ...data.newUserInfo,
                avatar: data.newUserInfo.avatar === null ? data.oldUserInfo.avatar : data.newUserInfo.avatar
            }));
            data.setToast();
        }

        return response.message;
    }
)

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.userList = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(saveChangesProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(saveChangesProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        })
        builder.addCase(saveChangesProfile.rejected, (state, action) => {
            state.loading = false;
            throw new Error(`${action.error.name}: ${action.error.message}`);
        })
        builder.addCase(saveChangesUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(saveChangesUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        })
        builder.addCase(saveChangesUser.rejected, (state, action) => {
            state.loading = false;
            throw new Error(`${action.error.name}: ${action.error.message}`);
        })
    }
});

export const { setData, setCurrentUser } = userReducer.actions;

export default userReducer.reducer;