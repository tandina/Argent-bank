import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    email: "",
    password: "",
    token: null,
    isLoading: false,
    error: null,
    firstName: "",
    lastName: "",
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        reset: () => initialState,
        setEmail: (state, action) => { state.email = action.payload },
        setPassword: (state, action) => { state.password = action.payload },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        }, setIsLoading: (state, action) => { state.isLoading = action.payload },
        setError: (state, action) => { state.error = action.payload },
        setFirstName: (state, action) => { state.firstName = action.payload },
        setLastName: (state, action) => { state.lastName = action.payload }

    }
})

export const { setEmail, setPassword, setToken, setIsLoading, setError, setLastName, setFirstName, reset } = loginSlice.actions;
export default loginSlice;