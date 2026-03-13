import Layout from "../../layouts/commonLayout/Layout";
import EntityFormPage from "../../components/shared/EntityFormPage";
import { entityConfigs } from "../../data/adminEntityConfigs";

export default function CompanyUsersForm({ mode }) {
  return (
    <Layout role="admin" title={mode === "edit" ? "Edit User" : "Add User"}>
      <EntityFormPage mode={mode} {...entityConfigs.user} />
    </Layout>
  );
}
