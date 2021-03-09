import { ADD_USER, REMOVE_USER } from './types'

export const addUser = (data) => ({
    type: ADD_USER,
    payload: { data },
})

export const removeUser = () => ({
    type: REMOVE_USER,
    // payload: { data },
})
