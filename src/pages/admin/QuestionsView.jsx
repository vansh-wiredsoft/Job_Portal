import Layout from "../../layouts/commonLayout/Layout";
import EntityViewPage from "../../components/shared/EntityViewPage";
import { entityConfigs } from "../../data/adminEntityConfigs";

export default function QuestionsView() {
  return (
    <Layout role="admin" title="View Question">
      <EntityViewPage {...entityConfigs.question} />
    </Layout>
  );
}
