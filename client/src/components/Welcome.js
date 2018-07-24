import React, { Component } from "react";
import { connect } from "react-redux";

import SignIn from "components/auth/SignIn";
import SignUp from "components/auth/SignUp";
import Grid from "components/form/FormGrid";

import { Tab } from "semantic-ui-react";

class Welcome extends Component {
  render() {
    const panes = [
      {
        menuItem: "Sign in",
        render: () => (
          <Tab.Pane attached={false}>
            <SignIn />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Register",
        render: () => (
          <Tab.Pane attached={false}>
            <SignUp />
          </Tab.Pane>
        )
      }
    ];
    const { authenticated } = this.props;
    return (
      <div className="login-form" style={{ marginTop: 120 }}>
        {!authenticated && this.props.history.push("/home")}
        <Grid>
          <Tab
            menu={{ secondary: true, pointing: true, size: "massive" }}
            panes={panes}
          />
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps)(Welcome);
