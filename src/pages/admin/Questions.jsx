import Layout from "../../layouts/commonLayout/Layout";
import ExcelUploadGrid from "../../components/shared/ExcelUploadGrid";
import {
  clearQuestionUploadError,
  resetQuestionUpload,
  uploadQuestionFile,
} from "../../store/questionUploadSlice";

export default function Questions() {
  return (
    <Layout role="admin" title="Question Bank">
      <ExcelUploadGrid
        title="Upload Questions"
        description="Import questions through Excel and review all records before publishing to sessions."
        uploadSelector={(state) => state.questionUpload}
        uploadThunk={uploadQuestionFile}
        resetUploadAction={resetQuestionUpload}
        clearUploadErrorAction={clearQuestionUploadError}
      />
    </Layout>
  );
}
