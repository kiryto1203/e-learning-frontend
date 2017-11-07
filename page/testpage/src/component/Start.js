import React, { Component } from 'react';
import '../css/start.css';

const buttonStart = {
  color: '#fff'
}

export default class Start extends Component {
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
        <button className="btn-start" style={buttonStart}>Start</button>
      </div>
    );
  }
}
