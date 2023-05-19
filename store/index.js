import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducers from "../reducers";

const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage: AsyncStorage, whitelist: ["likedJobs"] },
    reducers
  ),
  middleware: [thunk],
});
// persistStore(store).purge();
persistStore(store);
export default store;
