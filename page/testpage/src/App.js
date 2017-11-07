import React, { Component } from 'react';
import './css/App.css';
import Start from './component/Start';

const buttonStart = {
  color: '#fff'
}

export default class App extends Component {
  constructor()
  {
    super();
    this.state = {
      app: 0
    }
  }

  

  render() {
    let app;
    if(this.state.app===0)
    {
      console.log(1);
      app = <Start />
    }
    return (
      <div className="App">
        {app}
      </div>
    );
  }
}
