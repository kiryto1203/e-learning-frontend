import React, { Component } from 'react';
import '../css/Start.css';

export default class Start extends Component {

  handleClick()
  {
    this.props.handleClick();
  }

  render() {
    return (
      <div className="start">
        <div className="rules">
          <h3>Note:</h3>
          <p> - The test will start when you press the start button.</p>
          <p>- Lorem ipsum</p>
          <p>- Lorem ipsum</p>
          <p>- Lorem ipsum</p>
          <p>- Lorem ipsum</p>
          <p>- Lorem ipsum</p>
          <p>- Lorem ipsum</p>
        </div>
        <button className="btn-start" style={{color: "#fff" }} onClick={this.handleClick.bind(this)}>Start</button>
      </div>
    );
  }
}
