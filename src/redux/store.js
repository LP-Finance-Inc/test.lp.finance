import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware([thunk]));

export default store;
