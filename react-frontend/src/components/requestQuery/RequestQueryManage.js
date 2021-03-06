import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import ReactJson from "react-json-view";
import { notify } from "react-notify-toast";

import DatasetSelect from "../layout/common/DatasetSelect";
import RequestQuerySelect from "./RequestQuerySelect";
import {
  getQueryUriData,
  updateRequestQueryById,
  setSelectedRequestQueryToUndefined,
  removeRequestQueryById,
  setRequestQueryNull
} from "../../redux/actions/requestQuery/requestQueryActions";
import RequestQueryIntervalSelect from "./RequestQueryIntervalSelect";
import RequestQuerySwitches from "./RequestQuerySwitches";
import RequestQueryElements from "./RequestQueryElements";

class RequestQueryManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: "",
      requestQuery: null, // Object From Get
      name: "",
      queryURI: "",
      json: {},
      execute: false,
      downloadable: false,
      interval: "",
      queryArr: [],
      updatedQueryArr: []
    };
    this.RequestQueryElement = React.createRef();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected)
        this.setState({ dataset: nextProps.dataset.selected });
    }
    if (nextProps.requestQuery) {
      if (nextProps.requestQuery.execute !== undefined) {
        this.setState({ execute: nextProps.requestQuery.execute });
      }
      if (nextProps.requestQuery.downloadable !== undefined) {
        this.setState({ downloadable: nextProps.requestQuery.downloadable });
      }
      if (nextProps.requestQuery.interval) {
        this.setState({ interval: nextProps.requestQuery.interval });
      }
      if (nextProps.requestQuery.queryArr) {
        this.setState(
          { updatedQueryArr: nextProps.requestQuery.queryArr },
          () => {
            this.onSubmit();
          }
        );
      }
      if (nextProps.requestQuery.json)
        this.setState({ json: nextProps.requestQuery.json });

      if (this.state.requestQuery !== nextProps.requestQuery.selected) {
        if (nextProps.requestQuery) {
          if (nextProps.requestQuery.selected) {
            this.setState({
              requestQuery: nextProps.requestQuery.selected,
              name: nextProps.requestQuery.selected.name,
              queryURI: nextProps.requestQuery.selected.queryURI,
              execute: nextProps.requestQuery.selected.execute,
              downloadable: nextProps.requestQuery.selected.downloadable,
              interval: nextProps.requestQuery.selected.interval,
              queryArr: nextProps.requestQuery.selected.queryArr
            });
          }
        }
      }
    }
  }

  onSubmit = () => {
    if (this.state.updatedQueryArr) {
      const updateRequestQuery = {
        name: this.state.name,
        queryURI: this.state.queryURI,
        execute: this.state.execute,
        downloadable: this.state.downloadable,
        interval: this.state.interval,
        queryArr: this.state.updatedQueryArr,
        id: this.state.requestQuery._id
      };
      this.props.updateRequestQueryById(updateRequestQuery);
    } else {
      notify.show("You must select a Request Query", "error");
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  getQueryUriData = e => {
    if (this.state.queryURI !== "") {
      this.props.getQueryUriData({ queryURI: this.state.queryURI });
    } else {
      notify.show("Provide a valid API", "error");
    }
  };

  componentWillUnmount() {
    this.props.setSelectedRequestQueryToUndefined(undefined);
    this.props.setRequestQueryNull();
  }

  onClick = e => {
    if (this.state.requestQuery) {
      this.props.removeRequestQueryById(this.state.requestQuery._id);
    } else {
      notify.show("You must select a Request Query", "error");
    }
  };

  render() {
    return (
      <div>
        <h5>Select and Manage a Request Query</h5>
        <DatasetSelect />
        <div className="row col l12 s12">
          {this.state.dataset ? (
            <div>
              <RequestQuerySelect dataset_id={this.state.dataset} />
              <hr />
            </div>
          ) : (
            ""
          )}
          {/* If you select a Request Query */}

          <div>
            <div className="row">
              <div className="input-field col s12 l7">
                <input
                  value={this.state.queryURI}
                  onChange={this.onChange}
                  id="queryURI"
                  type="text"
                  className="validate"
                />
                <label htmlFor="requestURI">Request URI</label>
                <span className="helper-text" data-error="wrong" />
              </div>
              <button
                className="btn waves-effect waves-light col s12 l2 light-blue accent-4"
                name="action"
                onClick={this.getQueryUriData}
              >
                Test API
                <i className="material-icons right">send</i>
              </button>
              <Modal
                id="modal"
                header="Modal Header"
                trigger={
                  <Button
                    href="#modal"
                    className="btn waves-effect waves-light offset-l1 col s12 l2 light-blue accent-4"
                  >
                    Toggle
                    <i className="material-icons right">launch</i>
                  </Button>
                }
              >
                <ReactJson src={this.state.json} />
              </Modal>
            </div>
            {/* Name and Interval*/}
            <div className="row">
              <div className="input-field col s12 l7">
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  id="name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="name">Name</label>
                <span className="helper-text" data-error="wrong" />
              </div>
              <div className="col s12 l5">
                <RequestQueryIntervalSelect intervalVal={this.state.interval} />
              </div>
            </div>
            <RequestQuerySwitches
              execute={this.state.execute}
              downloadable={this.state.downloadable}
            />
            <hr />
            <RequestQueryElements
              ref={this.RequestQueryElement}
              queryArr={this.state.queryArr}
            />
          </div>
        </div>
        <div className="row">
          <div className="col l6 s6">
            <button
              className="waves-effect waves-light btn light-blue accent-4"
              onClick={() => {
                this.RequestQueryElement.current.getWrappedInstance().setJson();
              }}
            >
              Update
            </button>
          </div>
          <div className="col l6  s6">
            <Modal
              id="modalRemove"
              header="Are you sure you want to remove the file and its records from the database?"
              trigger={
                <Button className="btnwaves-effect waves-light red accent-2">
                  Remove
                  <i className="material-icons right">launch</i>
                </Button>
              }
            >
              <Button
                href="#modalRemove"
                className="btnwaves-effect waves-light red accent-2 modal-trigger"
                onClick={this.onClick}
              >
                Remove <i className="material-icons right">delete</i>
              </Button>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataset: state.dataset,
  requestQuery: state.requestQuery
});

export default connect(
  mapStateToProps,
  {
    getQueryUriData,
    updateRequestQueryById,
    setSelectedRequestQueryToUndefined,
    removeRequestQueryById,
    setRequestQueryNull
  },
  null,
  { withRef: true }
)(RequestQueryManage);
