import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sessionReducer from "./sessionSlice";
import companyReducer from "./companySlice";
import userUploadReducer from "./userUploadSlice";
import questionUploadReducer from "./questionUploadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    company: companyReducer,
    userUpload: userUploadReducer,
    questionUpload: questionUploadReducer,
  },
});

export default store;
