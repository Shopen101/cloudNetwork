import { combineReducers } from 'redux'
import main from './main'
import schema from './schema'
import allUserSchemes from './allUserSchemes'

const rootReducer = combineReducers({
    user: main,
    schema,
    allUserSchemes,
})

export default rootReducer
