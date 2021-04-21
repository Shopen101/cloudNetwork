const initialState = {
    schemesArr: [],
}

const schema = (state = initialState, action) => {
    switch (action.type) {
        case 'SETALLSCHEMES':
            return {
                ...state,
                schemesArr: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default schema
