import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { subscriptionsReducer as subscriptions } from "./reducers/subscription"

// you can have multiple reducers, this is why you need to merge them into one
// reducer using `combinereducers` function.
const reducer = combineReducers({state: subscriptions});

// Store object is managed by `redux-thunk`. This is now `redux-thunk` 'orchestrate' actions
// that change application state.
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
