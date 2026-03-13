import Layout from "../../layouts/commonLayout/Layout";
import EntityFormPage from "../../components/shared/EntityFormPage";
import { entityConfigs } from "../../data/adminEntityConfigs";

export default function QuestionsForm({ mode }) {
  return (
    <Layout
      role="admin"
      title={mode === "edit" ? "Edit Question" : "Add Question"}
    >
      <EntityFormPage mode={mode} {...entityConfigs.question} />
    </Layout>
  );
}
