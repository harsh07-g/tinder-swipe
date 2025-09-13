
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user'


interface ProfilesState {
    users: User[]
    currentIndex: number
    liked: User[]
}


const initialState: ProfilesState = {
    users: [],
    currentIndex: 0,
    liked: []
}


const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
            state.currentIndex = 0
        },
        likeUser(state, action: PayloadAction<User>) {
            state.liked.push(action.payload)
        },
        nextProfile(state) {
            if (state.currentIndex < state.users.length - 1) {
                state.currentIndex += 1
            } else {
                state.currentIndex = state.users.length // indicates end
            }
        },
        removeLikedById(state, action: PayloadAction<string>) {
            state.liked = state.liked.filter(u => u.id !== action.payload)
        }
    }
})


export const { setUsers, likeUser, nextProfile, removeLikedById } = profilesSlice.actions
export default profilesSlice.reducer