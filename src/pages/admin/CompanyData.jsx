import Layout from "../../layouts/commonLayout/Layout";
import ExcelUploadGrid from "../../components/shared/ExcelUploadGrid";
import {
  clearCompanyUploadError,
  resetCompanyUpload,
  uploadCompanyFile,
} from "../../store/companySlice";

export default function CompanyData() {
  return (
    <Layout role="admin" title="Company Data">
      <ExcelUploadGrid
        title="Upload Company Data"
        description="Upload a company master file in Excel/CSV format and review records in the grid."
        uploadSelector={(state) => ({
          loading: state.company.uploadLoading,
          status: state.company.uploadStatus,
          error: state.company.uploadError,
          responseData: state.company.uploadResponseData,
        })}
        uploadThunk={uploadCompanyFile}
        resetUploadAction={resetCompanyUpload}
        clearUploadErrorAction={clearCompanyUploadError}
      />
    </Layout>
  );
}
