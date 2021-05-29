import {
  createStore,
  applyMiddleware,
  compose as origCompose,
  combineReducers,
} from "redux";
import thunk from "./services/reduxThunk";
import { lazyReducerEnhancer } from "pwa-helpers";
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

import {baseColor, keyColors, contrastStops, colorSpace} from "./reducers";


export const store = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

store.addReducers({
  baseColor, keyColors, contrastStops, colorSpace
}); 