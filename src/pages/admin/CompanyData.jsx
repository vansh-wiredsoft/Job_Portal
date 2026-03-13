import { useLocation } from "react-router-dom";
import { Alert, Stack } from "@mui/material";
import Layout from "../../layouts/commonLayout/Layout";
import EntityManagementTable from "../../components/shared/EntityManagementTable";
import { entityConfigs } from "../../data/adminEntityConfigs";

export default function CompanyData() {
  const location = useLocation();
  const feedback = location.state?.feedback;
  const config = entityConfigs.company;

  return (
    <Layout role="admin" title="Company Data">
      <Stack spacing={2}>
        {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
        <EntityManagementTable {...config} />
      </Stack>
    </Layout>
  );
}
