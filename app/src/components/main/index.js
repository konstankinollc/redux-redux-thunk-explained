import React, { Component } from "react";

export default class MainComponent extends Component {

  handleLoadDataOnClick = () => {
    this.props.actions.fetchSubscription("https://jsonplaceholder.typicode.com/todos/1");
  }

  loader = () => {
    if (this.props.state.loading) {
      return <p>Please wait, I am loading data for you...</p>
    }
  }

  button = () => {
    if (this.props.state.loading) {
      return (
        <button disabled="disabled">
          Hold tight!
        </button>
      )
    } else {
      return (
        <button onClick={this.handleLoadDataOnClick}>
          Load Data
        </button>
      )
    }
  }

  result = () => {
    if (this.props.state.subscription) {
      return (
        <p>I just loaded: "{this.props.state.subscription.title}"</p>
      )
    }
  }

  render() {
    return (
      <>
        <p>Hi, press button below to load data from the API.</p>

        {this.button()}

        {this.loader()}

        {this.result()}
      </>
    )
  }
}
