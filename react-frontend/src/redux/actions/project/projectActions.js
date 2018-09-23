import { GET_ERRORS, SET_PROJECT_SELECT, SET_PROJECT } from "../types";
import { notify } from "react-notify-toast";
import axios from "axios";

export const projectAdd = projectData => dispatch => {
  axios
    .post("/post-project", projectData)
    .then(res => {
      if (typeof res.data === "string") {
        notify.show(res.data, "success");
      }
    })
    .catch(err => {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      } else if (typeof err.response.data === "object") {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const updateProject = (id, projectData) => dispatch => {
  axios
    .put("/put-project/id/" + id, projectData)
    .then(res => {
      if (typeof res.data === "string") notify.show(res.data, "success");
    })
    .catch(err => {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      } else if (typeof err.response.data === "object") {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const getProject = id => dispatch => {
  axios
    .get("/get-project/id/" + id)
    .then(res => {
      dispatch({
        type: SET_PROJECT,
        payload: res.data
      });
    })
    .catch(err => {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      } else if (typeof err.response.data === "object") {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const getProjectsForSelect = () => dispatch => {
  axios
    .get("/get-project/select")
    .then(res => {
      dispatch({
        type: SET_PROJECT_SELECT,
        payload: res.data
      });
    })
    .catch(err => {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      } else if (typeof err.response.data === "object") {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};