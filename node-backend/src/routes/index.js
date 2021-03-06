const API_BASE = "/api";
// REQUIRING ROUTES
const postAdmin = require("./admin/post.js");
const postAuth = require("./auth/post.js");
const postDatasetType = require("./datasetType/post");
const getDatasetType = require("./datasetType/get");
const putDatasetType = require("./datasetType/put");
const deleteDatasetType = require("./datasetType/delete");
const postProject = require("./project/post");
const getProject = require("./project/get");
const putProject = require("./project/put");
const deleteProject = require("./project/delete");
const postDataset = require("./dataset/post");
const getDataset = require("./dataset/get");
const putDataset = require("./dataset/put");
const deleteDataset = require("./dataset/delete");
const postRequestQuery = require("./requestQuery/post");
const getRequestQuery = require("./requestQuery/get");
const putRequestQuery = require("./requestQuery/put");
const deleteRequestQuery = require("./requestQuery/delete");
const postChartjs2 = require("./chartjs2/post");
const putChartjs2 = require("./chartjs2/put");
const getChartjs2 = require("./chartjs2/get");
const deleteChartjs2 = require("./chartjs2/delete");
const gridfs = require("./gridfsRouter");

module.exports = function(app) {
  // "/api/gridfs/*" ALREADY IN USE
  // ROUTES
  app.use(API_BASE + "/post-admin", postAdmin);
  app.use(API_BASE + "/post-auth", postAuth);
  app.use(API_BASE + "/post-datasettype", postDatasetType);
  app.use(API_BASE + "/get-datasettype", getDatasetType);
  app.use(API_BASE + "/put-datasettype", putDatasetType);
  app.use(API_BASE + "/delete-datasettype", deleteDatasetType);
  app.use(API_BASE + "/post-project", postProject);
  app.use(API_BASE + "/get-project", getProject);
  app.use(API_BASE + "/put-project", putProject);
  app.use(API_BASE + "/delete-project", deleteProject);
  app.use(API_BASE + "/post-dataset", postDataset);
  app.use(API_BASE + "/get-dataset", getDataset);
  app.use(API_BASE + "/put-dataset", putDataset);
  app.use(API_BASE + "/delete-dataset", deleteDataset);
  app.use(API_BASE + "/post-requestquery", postRequestQuery);
  app.use(API_BASE + "/get-requestquery", getRequestQuery);
  app.use(API_BASE + "/put-requestquery", putRequestQuery);
  app.use(API_BASE + "/delete-requestquery", deleteRequestQuery);
  app.use(API_BASE + "/post-chartjs2", postChartjs2);
  app.use(API_BASE + "/put-chartjs2", putChartjs2);
  app.use(API_BASE + "/get-chartjs2", getChartjs2);
  app.use(API_BASE + "/delete-chartjs2", deleteChartjs2);
  app.use(API_BASE + "/gridfs", gridfs);
};
