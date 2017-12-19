import React, { Component } from 'react';
import './css/App.css';
import Start from './component/Start';
import Utility from './Utility';
import Process from './component/Process';

export default class App extends Component {
  constructor()
  {
    super();
    this.state = {
      app: 0,
      utility: new Utility(),
      lession_id: '',
      questions: [],
    }
  }

  getData()
  {
    this.state.utility.ajaxPromise(`${this.state.utility.host}/db`,"GET")
    .then((result) => {
      this.setState({
        lession_id: result.lession_id[0],
        questions: result.questions,
        app: 1
      })
    })
  }

  handleClickStart()
  {
    this.getData();
  }

  render() {
    let app;
    app = this.state.app===0 ? <Start handleClick={this.handleClickStart.bind(this)} />
                             : <Process questions={this.state.questions} />;
    return (
      <div className="App">
        {app}
      </div>
    );
  }
}
