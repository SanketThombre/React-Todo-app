
import { createStore ,combineReducers,applyMiddleware,compose} from 'redux';

import { loginreducer } from "./Login/reducer";

import { todoreducer } from './Todos/reducer';

import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);


const rootReducer = combineReducers({
  login: loginreducer,
  todos : todoreducer
})
export const store = createStore(rootReducer, enhancer);