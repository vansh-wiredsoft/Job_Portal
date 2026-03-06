import Layout from "../../layouts/commonLayout/Layout";
import ExcelUploadGrid from "../../components/shared/ExcelUploadGrid";
import {
  clearUserUploadError,
  resetUserUpload,
  uploadUserFile,
} from "../../store/userUploadSlice";

export default function CompanyUsers() {
  return (
    <Layout role="admin" title="Company User Data">
      <ExcelUploadGrid
        title="Upload Company User Data"
        description="Upload employee or candidate data mapped to companies and validate in the table."
        uploadSelector={(state) => state.userUpload}
        uploadThunk={uploadUserFile}
        resetUploadAction={resetUserUpload}
        clearUploadErrorAction={clearUserUploadError}
      />
    </Layout>
  );
}
