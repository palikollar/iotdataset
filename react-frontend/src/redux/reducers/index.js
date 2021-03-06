import { combineReducers } from "redux";
import authReducer from "../reducers/auth/authReducer";
import errorsReducer from "../reducers/error/errorsReducer";
import datasetTypeReducer from "../reducers/datasetType/datasetTypeReducer";
import projectsReducer from "../reducers/project/projectsReducer";
import datasetReducer from "../reducers/dataset/datasetReducers";
import requestQueryReducer from "../reducers/requestQuery/requestQueryReducers";
import gridfsReducers from "../reducers/gridfs/gridFSReducers";
import chartjs2Reducers from "../reducers/chartjs2/chartjs2Reducers";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  datasetType: datasetTypeReducer,
  projects: projectsReducer,
  dataset: datasetReducer,
  requestQuery: requestQueryReducer,
  gridfs: gridfsReducers,
  chartjs2: chartjs2Reducers
});
