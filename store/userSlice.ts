// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    email: string;
    name: string;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    id: '',
    email: '',
    name: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    // { id : sti} : user
        login: (state, action: PayloadAction<{ user: { id: string; email: string; name: string } }>) => {
            console.log(action.payload);
            state.id = action.payload.user.id;
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.id = '';
            state.email = '';
            state.name = '';
            state.isLoggedIn = false;
        },
    },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export the reducer to be used in the store configuration
export default userSlice.reducer;
