/* libs */
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/* middleware */
import { promiseMiddleware } from './middleware';

/* reducers */
import challenges from '../reducers/challenges';

const reducer = combineReducers({
  challenges
});

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, {}, composeWithDevTools(middleware));

const persistConfig = {};

export default store;
