import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { logoutAdmin } from "../../../redux/actions/auth/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutAdmin();
  };

  render() {
    const { isAuthenticated, admin } = this.props.auth;

    const authLinks = (
      <div className={classNames({ hide: !isAuthenticated })}>
        <ul className="right hide-on-med-and-down">
          <li>
            <a className="dropdown-trigger" data-target="dropdown-admin">
              Admin
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li>
            <a onClick={this.onLogoutClick}>Logout</a>
          </li>
        </ul>
        <ul id="dropdown-admin" className="dropdown-content">
          <li>
            <Link to="/admin/register">Register Admin</Link>
          </li>
          <li>
            <Link to="/admin/projects">Project</Link>
          </li>
          <li>
            <Link to="/admin/datasettype">Dataset Type</Link>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <nav>
          <div className="nav-wrapper  blue darken-4">
            <div className="row">
              <div id="nav-0" className="col l4">
                <a data-target="mobile-sidebar" className="sidenav-trigger">
                  <i className="material-icons">menu</i>
                </a>
                <ul className="left hide-on-med-and-down">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-trigger"
                      data-target="dropdown-projects"
                    >
                      Projects
                      <i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="nav-1" className="col l4">
                <a className="brand-logo">IoT Datasets</a>
              </div>
              <div id="nav-2" className="col l4">
                {authLinks}
              </div>
            </div>
          </div>
        </nav>

        <ul id="dropdown-projects" className="dropdown-content">
          <li>
            <Link to="/projects/smartcity">Smart Cities</Link>
          </li>
          <li>
            <Link to="/projects/organization">Organizations</Link>
          </li>
          <li>
            <Link to="/projects/university">Universities</Link>
          </li>
        </ul>

        <ul className="sidenav" id="mobile-sidebar">
          <li>
            <Link to="/projects/smartcity">Smart Cities</Link>
          </li>
          <li>
            <Link to="/projects/organization">Organizations</Link>
          </li>
          <li>
            <Link to="/projects/university">Universities</Link>
          </li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutAdmin }
)(Navbar);