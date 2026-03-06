import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const SESSION_PATH = "/config/api/v1/sessions";

const initialState = {
  createdSession: null,
  addedQuestions: [],
  sessions: [],
  createLoading: false,
  addLoading: false,
  listLoading: false,
  createMessage: "",
  addMessage: "",
  listMessage: "",
  error: null,
  listError: null,
};

export const createSession = createAsyncThunk(
  "session/createSession",
  async ({ title, description, companyId }, { rejectWithValue }) => {
    try {
      const response = await api.post(SESSION_PATH, {
        title,
        description,
        company_id: String(companyId),
      });

      const payload = response?.data || {};
      if (!payload?.success || !payload?.data?.id) {
        return rejectWithValue(payload?.message || "Session creation failed.");
      }

      return {
        session: payload.data,
        message: payload.message || "Session created successfully.",
      };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Session creation failed due to server/network error.";
      return rejectWithValue(message);
    }
  },
);

export const addQuestionsToSession = createAsyncThunk(
  "session/addQuestionsToSession",
  async ({ sessionId, questionIds }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${SESSION_PATH}/${sessionId}/questions`, {
        question_ids: questionIds,
      });

      const payload = response?.data || {};
      if (!payload?.success) {
        return rejectWithValue(payload?.message || "Failed to add questions.");
      }

      return {
        addedQuestions: Array.isArray(payload?.data) ? payload.data : [],
        message: payload?.message || "Questions added to session successfully.",
      };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Failed to add questions due to server/network error.";
      return rejectWithValue(message);
    }
  },
);

export const fetchSessions = createAsyncThunk(
  "session/fetchSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(SESSION_PATH);
      const payload = response?.data || {};

      if (!payload?.success) {
        return rejectWithValue(payload?.message || "Failed to fetch sessions.");
      }

      return {
        sessions: Array.isArray(payload?.data) ? payload.data : [],
        message: payload?.message || "Sessions fetched successfully.",
      };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Failed to fetch sessions due to server/network error.";
      return rejectWithValue(message);
    }
  },
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSessionError(state) {
      state.error = null;
    },
    clearSessionListError(state) {
      state.listError = null;
    },
    clearSessionMessages(state) {
      state.createMessage = "";
      state.addMessage = "";
    },
    resetSessionFlow(state) {
      state.createdSession = null;
      state.addedQuestions = [];
      state.createLoading = false;
      state.addLoading = false;
      state.createMessage = "";
      state.addMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.createMessage = "";
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createdSession = action.payload.session;
        state.addedQuestions = [];
        state.createMessage = action.payload.message;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload || "Session creation failed.";
      })
      .addCase(addQuestionsToSession.pending, (state) => {
        state.addLoading = true;
        state.error = null;
        state.addMessage = "";
      })
      .addCase(addQuestionsToSession.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addedQuestions = action.payload.addedQuestions;
        state.addMessage = action.payload.message;
      })
      .addCase(addQuestionsToSession.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload || "Failed to add questions.";
      })
      .addCase(fetchSessions.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.listLoading = false;
        state.sessions = action.payload.sessions;
        state.listMessage = action.payload.message;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload || "Failed to fetch sessions.";
      });
  },
});

export const {
  clearSessionError,
  clearSessionListError,
  clearSessionMessages,
  resetSessionFlow,
} = sessionSlice.actions;
export default sessionSlice.reducer;
