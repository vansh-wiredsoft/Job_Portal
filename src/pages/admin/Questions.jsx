import { useLocation } from "react-router-dom";
import { Alert, Stack } from "@mui/material";
import Layout from "../../layouts/commonLayout/Layout";
import EntityManagementTable from "../../components/shared/EntityManagementTable";
import { entityConfigs } from "../../data/adminEntityConfigs";

export default function Questions() {
  const location = useLocation();
  const feedback = location.state?.feedback;
  const config = entityConfigs.question;

  return (
    <Layout role="admin" title="Question Bank">
      <Stack spacing={2}>
        {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
        <EntityManagementTable {...config} />
      </Stack>
    </Layout>
  );
}
