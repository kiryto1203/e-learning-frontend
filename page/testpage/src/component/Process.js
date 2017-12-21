import React , { Component } from 'react';
import Navigate from './Navigate';
import Content from './Content';
import Select from './Select';
import answer from '../model/answer';

export default class Process extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      order: 1,
      question: this.props.questions[0],
      question_parent: "",
      answers: this.setAnswer()
    };
  }

  setAnswer()
  {
    let a = localStorage.getItem('answers');
    if(a) return JSON.parse(a);
    else {
      let list=[];
      this.props.questions.forEach((v,k)=>{
        if(v.type===2)
          list.push(new answer(v.question_code,""));
        else
          list.push(new answer(v.question_code,[]));
      })
      localStorage.setItem('answers',JSON.stringify(list));
      return list;
    }
  }

  changeAnswer(e)
  {
    this.setState({
      answers: e
    })
  }

  changeQuestion(e,f)
  {
    let a = this.props.questions.find(w=> w.question_code === e);
    this.setState({
      order: f,
      question: a,
      question_parent: a.parent!==""
            ? this.props.questions.find(w=> w.question_code===a.parent)
            : ""
    });
  }

  getListQuestionCode()
  {
    let list = [];
    for (var i = 0; i < this.props.questions.length; i++) {
      if(this.props.questions[i].type!==3)
        list.push(this.props.questions[i].question_code);
    }
    return list;
  }

  render()
  {
    return (
      <div>
        <Select listQuestionCode={this.getListQuestionCode()}
                handleSelect={this.changeQuestion.bind(this)}
                order={this.state.order}
                current={this.state.question.question_code}
                answers={this.state.answers}/>
        <Content question={this.state.question}
                 order={this.state.order}
                 question_parent={this.state.question_parent}
                 changeAnswer={this.changeAnswer.bind(this)} />
        <Navigate listQuestionCode={this.getListQuestionCode()}
                  handleSelect={this.changeQuestion.bind(this)}
                  order={this.state.order}
                  current={this.state.question.question_code} />
      </div>
    )
  }
}
