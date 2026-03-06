import Layout from "../../layouts/commonLayout/Layout";
import ExcelUploadGrid from "../../components/shared/ExcelUploadGrid";
import {
  clearCompanyUploadError,
  resetCompanyUpload,
  uploadCompanyFile,
} from "../../store/companyUploadSlice";

export default function CompanyData() {
  return (
    <Layout role="admin" title="Company Data">
      <ExcelUploadGrid
        title="Upload Company Data"
        description="Upload a company master file in Excel/CSV format and review records in the grid."
        uploadSelector={(state) => state.companyUpload}
        uploadThunk={uploadCompanyFile}
        resetUploadAction={resetCompanyUpload}
        clearUploadErrorAction={clearCompanyUploadError}
      />
    </Layout>
  );
}
