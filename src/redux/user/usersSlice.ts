import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

const without = require('lodash/without');

// Define a type for the slice state
interface UsersState {
    users: Array<User>;
}

interface User {
    userID: number,
    username: string,
}
// Define the initial state using that type
const initialState: UsersState = {
    users: [],
}

export const usersSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users = [...state.users, action.payload]
        },
        removeUser: (state, action: PayloadAction<User>) => {
            state.users = without(state.users, action.payload)
        },
    },
})

export const { addUser, removeUser } = usersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users

export default usersSlice.reducer