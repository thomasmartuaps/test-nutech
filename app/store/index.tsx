import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import { createBrowserRouter } from "react-router";

// const router = createBrowserRouter([...]);

const saga = createSagaMiddleware();

// saga.setContext({ router }); //

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(rootSaga);

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export default store;
