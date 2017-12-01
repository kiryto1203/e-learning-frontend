import React , { Component } from 'react';

export default class Answer extends Component
{
  constructor()
  {
    super();
    this.state = {
      alpha : ['A','B','C','D','E','F','G','H','J','K']
    };

  }

  selectAnswer()
  {
    this.props.selectAnswer(this.props.value.answer_id);
  }

  render()
  {
    return (
      <div>
        <p className={this.props.choice} onClick={this.selectAnswer.bind(this)}>{this.state.alpha[this.props.index]}. {this.props.value.content}</p>
      </div>
    )
  }
}
