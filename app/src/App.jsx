import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MainComponent from "./components/main";

import * as SubscriptionActions from "./actions/subscription";

class App extends Component {

  render() {
    const { actions, state } = this.props;
    return (<MainComponent actions={actions} state={state} />);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(
      {}, SubscriptionActions), dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(App);
