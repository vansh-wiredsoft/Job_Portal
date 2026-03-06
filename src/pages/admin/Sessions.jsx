import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../layouts/commonLayout/Layout";
import api from "../../services/api";

const COMPANY_PATH = "/config/api/v1/companies";
const QUESTION_PATH = "/config/api/v1/kpiquestions";
const SESSION_PATH = "/config/api/v1/sessions";

const pickArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const normalizeCompany = (item, index) => ({
  id: String(item?.id || item?.company_id || index),
  name: item?.name || item?.company_name || item?.title || "Unnamed Company",
});

const normalizeQuestion = (item, index) => ({
  id: String(item?.id || item?.question_id || index),
  text: item?.question_text || item?.text || item?.name || "Untitled Question",
  code: item?.question_code || "",
});

export default function Sessions() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [addingQuestions, setAddingQuestions] = useState(false);
  const [sessionCreated, setSessionCreated] = useState(null);
  const [addedQuestionsSummary, setAddedQuestionsSummary] = useState([]);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedCompanyName = useMemo(
    () => companies.find((company) => company.id === companyId)?.name || "",
    [companyId],
  );

  useEffect(() => {
    const loadMeta = async () => {
      try {
        setLoadingMeta(true);
        const [companiesRes, questionsRes] = await Promise.all([
          api.get(COMPANY_PATH),
          api.get(QUESTION_PATH),
        ]);

        setCompanies(pickArray(companiesRes?.data).map(normalizeCompany));
        setQuestions(pickArray(questionsRes?.data).map(normalizeQuestion));
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          "Failed to load companies/questions.";
        setFormError(message);
      } finally {
        setLoadingMeta(false);
      }
    };

    loadMeta();
  }, []);

  const toggleQuestion = (questionId) => {
    setSelectedQuestions((current) =>
      current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId],
    );
  };

  const createSession = async () => {
    if (!title.trim() || !description.trim() || !companyId) {
      setFormError("Title, description and company are required.");
      return;
    }

    try {
      setCreatingSession(true);
      setFormError("");
      setSuccessMessage("");
      setAddedQuestionsSummary([]);

      const response = await api.post(SESSION_PATH, {
        title: title.trim(),
        description: description.trim(),
        company_id: companyId,
      });

      const payload = response?.data || {};
      if (!payload?.success || !payload?.data?.id) {
        setFormError(payload?.message || "Session creation failed.");
        return;
      }

      setSessionCreated(payload.data);
      setSuccessMessage(payload.message || "Session created successfully.");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Session creation failed due to server/network error.";
      setFormError(message);
    } finally {
      setCreatingSession(false);
    }
  };

  const addQuestionsToSession = async () => {
    if (!sessionCreated?.id) {
      setFormError("Create the session first.");
      return;
    }
    if (!selectedQuestions.length) {
      setFormError("Select at least one question.");
      return;
    }

    try {
      setAddingQuestions(true);
      setFormError("");
      setSuccessMessage("");

      const response = await api.post(
        `${SESSION_PATH}/${sessionCreated.id}/questions`,
        { question_ids: selectedQuestions },
      );

      const payload = response?.data || {};
      if (!payload?.success) {
        setFormError(payload?.message || "Failed to add questions.");
        return;
      }

      setAddedQuestionsSummary(Array.isArray(payload?.data) ? payload.data : []);
      setSuccessMessage(payload?.message || "Questions added successfully.");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Failed to add questions due to server/network error.";
      setFormError(message);
    } finally {
      setAddingQuestions(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCompanyId("");
    setSelectedQuestions([]);
    setSessionCreated(null);
    setAddedQuestionsSummary([]);
    setFormError("");
    setSuccessMessage("");
  };

  return (
    <Layout role="admin" title="Create Session">
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "rgba(255,255,255,0.86)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 750, mb: 0.7 }}>
              Session Details
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2.5 }}>
              Create session first, then select questions and add them to the created
              session.
            </Typography>

            <Stack spacing={2}>
              {!!formError && <Alert severity="error">{formError}</Alert>}
              {!!successMessage && <Alert severity="success">{successMessage}</Alert>}

              <TextField
                label="Session Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                disabled={!!sessionCreated}
              />

              <TextField
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
                multiline
                minRows={3}
                disabled={!!sessionCreated}
              />

              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={companyId}
                  onChange={(event) => setCompanyId(event.target.value)}
                  disabled={!!sessionCreated || loadingMeta}
                >
                  <MenuItem value="">Select Company</MenuItem>
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {!sessionCreated && (
                <Button
                  variant="contained"
                  onClick={createSession}
                  disabled={creatingSession || loadingMeta}
                >
                  {creatingSession ? "Creating Session..." : "Create Session"}
                </Button>
              )}

              {!!sessionCreated && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Add Questions
                  </Typography>
                  {loadingMeta ? (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Loading question list...
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack
                      spacing={0.6}
                      sx={{ maxHeight: 240, overflowY: "auto", pr: 1 }}
                    >
                      {questions.map((question) => (
                        <FormControlLabel
                          key={question.id}
                          control={
                            <Checkbox
                              checked={selectedQuestions.includes(question.id)}
                              onChange={() => toggleQuestion(question.id)}
                            />
                          }
                          label={
                            question.code
                              ? `${question.text} (${question.code})`
                              : question.text
                          }
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              )}

              <Stack direction="row" spacing={1.2}>
                {!!sessionCreated && (
                  <Button
                    variant="contained"
                    onClick={addQuestionsToSession}
                    disabled={addingQuestions || !selectedQuestions.length}
                  >
                    {addingQuestions ? "Adding Questions..." : "Add Questions"}
                  </Button>
                )}
                <Button variant="outlined" onClick={resetForm}>
                  {sessionCreated ? "Create New Session" : "Reset"}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "rgba(255,255,255,0.86)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Session Preview
            </Typography>

            <Stack spacing={1.5}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Title
                </Typography>
                <Typography>{title || "-"}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Company
                </Typography>
                <Typography>{selectedCompanyName || "-"}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography>{description || "-"}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Session ID
                </Typography>
                <Typography>{sessionCreated?.id || "-"}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Selected Questions
                </Typography>
                <Typography>{selectedQuestions.length}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Questions Added
                </Typography>
                <Typography>{addedQuestionsSummary.length}</Typography>
              </Box>
            </Stack>

            {!!addedQuestionsSummary.length && (
              <Paper variant="outlined" sx={{ mt: 2, p: 1.5, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.8 }}>
                  Added Questions Summary
                </Typography>
                <Stack spacing={0.8}>
                  {addedQuestionsSummary.map((item) => (
                    <Typography key={item.question_id} variant="body2">
                      {item.display_order}. {item.question_text} ({item.question_code})
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
