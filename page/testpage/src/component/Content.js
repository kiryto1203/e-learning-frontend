import React, { Component } from 'react';
import '../css/Content.css';
import Answer from './Answer';
// import $ from 'jquery';

export default class Content extends Component
{
    constructor(props)
    {
      super(props);
      this.state={
        answer: this.getAnswerFromLocal(this.props.question.question_code,true),
        answerText: this.getAnswerFromLocal(this.props.question.question_code,false)
      }
    }

    selectAnswer(e)
    {
      let a = this.state.answer;
      switch (this.props.question.type) {
        case 1:
          a.length = 0;
          a.push(e);
          break;
        default:
          if(!a.find(w=>w===e))
            a.push(e); // add answer to array
          else
            a = a.filter(w=> w!==e); // remove answer to arry
          break;
      }
      this.setState({
        answer: a
      })
      this.changeAnswersAtLocal(a,this.props.question.question_code);
    }

    changeAnswer(e)
    {
      this.setState({
        answerText: e
      });
      this.changeAnswersAtLocal(e,this.props.question.question_code);
    }

    changeAnswersAtLocal(e,q)
    {
      let a = JSON.parse(localStorage.getItem('answers'));
      a.find(w=> { return w.question_code===q ? w.answer=e : console.log(); } );
      localStorage.setItem('answers',JSON.stringify(a));
      this.props.changeAnswer(a);
    }

    getAnswerFromLocal(q,array)
    {
      let a = JSON.parse(localStorage.getItem('answers'));
      if(array)
        return a ? a.find(w=>w.question_code===q).answer : [];
      else
        return a ? a.find(w=>w.question_code===q).answer : "";
    }

    render()
    {
      let a;
      if(this.props.question.type===2)
        a = <TextArea changeAnswer={this.changeAnswer.bind(this)} answer={this.getAnswerFromLocal(this.props.question.question_code,false)}/>
      else {
        a = this.props.question.answers.map((v,k)=>{
          let choice = this.getAnswerFromLocal(this.props.question.question_code,true).find(w=>w===v.answer_id)
                     ? "choice"
                     : "";
          return <Answer key={k} index={k} value={v} selectAnswer={this.selectAnswer.bind(this)} choice={choice} />
        })
      }
      return (
        <div className="Content">
          <p>{this.props.question_parent!=="" ? this.props.question_parent.content : ""}</p>
          <div className="question">
            <h3>Question {this.props.order}: </h3>
            <p>{this.props.question.content}</p>
          </div>
          <div className="answer">
            {a}
          </div>
        </div>
      )
    }
}

class TextArea extends Component
{
  changeAnswer(e)
  {
    this.props.changeAnswer(e.target.value);
  }
  render()
  {
    return (
      <textarea onChange={this.changeAnswer.bind(this)} className="TextArea" placeholder="Enter your answer in here." value={this.props.answer}>
      </textarea>
    )
  }
}
