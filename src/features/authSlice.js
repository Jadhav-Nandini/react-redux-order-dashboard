import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const newUser = {
                id: Date.now(),
                ...action.payload,
            };

            state.users.push(newUser);
            state.currentUser = newUser;

            localStorage.setItem("users", JSON.stringify(state.users))
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
        },

        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(
                (client) => client.email === email && client.password === password
            );

            if (user) {
                state.currentUser = user;
                localStorage.setItem("currentUser", JSON.stringify(user));

            } else {
                alert("register")
            }

        },

        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser")
        },

        addAddress: (state, action) => {
            state.currentUser.address = action.payload

            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))

            const index = state.users.findIndex(
                (u) => u.id === state.currentUser.id
            );

            state.users[index] = state.currentUser;

            localStorage.setItem("users", JSON.stringify(state.users));


        },
        updateUser: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                ...action.payload,
            };
            const index = state.users.findIndex(
                (u) => u.id === state.currentUser.id
            );
            state.users[index] = state.currentUser;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
            localStorage.setItem("users", JSON.stringify(state.users));
        },
    }
})

export const { registerUser, loginUser, logoutUser, addAddress, updateUser } = authSlice.actions
export default authSlice.reducer;

