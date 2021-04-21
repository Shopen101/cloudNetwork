const initialState = {
    nodes: [],
    links: [],
    simular: false,
}

const schema = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHSCHEMA':
            return {
                ...state,
            }
        case 'SETSCHEMA':
            return {
                ...state,
                nodes: action.payload.nodes,
                links: action.payload.links,
            }
        case 'SETSIMULAR':
            return {
                ...state,
                simular: action.payload,
            }

        case 'LOGOUT':
            return {
                ...state,
                nodes: [],
                links: [],
                simular: false,
            }
        case 'LOADSELECTEDSCHEMA':
            return {
                ...state,
                nodes: action.payload.nodes,
                links: action.payload.links,
            }
        case 'CLEARCURRENTSCHEMA':
            return {
                ...state,
                nodes: [],
                links: [],
                simular: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default schema
