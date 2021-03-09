import { ADD_USER, REMOVE_USER } from '../types'

const initialState = { user: {} }

const user = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            const { data } = action.payload
            return {
                ...state,
                user: { ...data },
            }
        case REMOVE_USER:
            return {
                user: {},
            }
        default:
            return state
    }
}

export default user
