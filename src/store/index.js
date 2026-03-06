import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sessionReducer from "./sessionSlice";
import companyUploadReducer from "./companyUploadSlice";
import userUploadReducer from "./userUploadSlice";
import questionUploadReducer from "./questionUploadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    companyUpload: companyUploadReducer,
    userUpload: userUploadReducer,
    questionUpload: questionUploadReducer,
  },
});

export default store;
