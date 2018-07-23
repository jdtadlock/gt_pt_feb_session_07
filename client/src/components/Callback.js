import React, { Component } from 'react';

// STEP #4
class Callback extends Component {
  componentDidMount() {
    this.props.processAuth();
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Callback;