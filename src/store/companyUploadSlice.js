import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const COMPANY_UPLOAD_PATH = "/config/api/v1/companies/upload";

const initialState = {
  loading: false,
  status: null,
  error: "",
  responseData: null,
};

export const uploadCompanyFile = createAsyncThunk(
  "companyUpload/uploadCompanyFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(COMPANY_UPLOAD_PATH, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const payload = response?.data || {};
      if (!payload?.success) {
        return rejectWithValue(payload?.message || "Upload failed.");
      }

      return payload?.data || null;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Upload failed due to server/network error.";
      return rejectWithValue(message);
    }
  },
);

const companyUploadSlice = createSlice({
  name: "companyUpload",
  initialState,
  reducers: {
    resetCompanyUpload(state) {
      state.loading = false;
      state.status = null;
      state.error = "";
      state.responseData = null;
    },
    clearCompanyUploadError(state) {
      state.error = "";
      if (state.status === "error") {
        state.status = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCompanyFile.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.error = "";
        state.responseData = null;
      })
      .addCase(uploadCompanyFile.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.responseData = action.payload;
      })
      .addCase(uploadCompanyFile.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        state.error = action.payload || "Upload failed.";
      });
  },
});

export const { resetCompanyUpload, clearCompanyUploadError } =
  companyUploadSlice.actions;
export default companyUploadSlice.reducer;
