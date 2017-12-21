import React, {Component} from 'react';
import '../css/Navigate.css';
import arrow from '../image/arrow.png';
import $ from 'jquery';

export default class Navigate extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      show: false,
      order: this.props.order,
      current: this.props.current
    };
    this.unit = window.innerWidth <= 320 ? 50 : 80;
  }

  handleSelects(c,o)
  {
    let change=this.unit*(o-2);
    if(o===20) change=this.unit*(o-3);
    if(o===1) change=this.unit*(o-1);
    $(".pagenumberitem").animate({left: `-${change}px`}, "500");
    this.props.handleSelect(c,o);
  }

  nextQuestion()
  {
    let o = this.props.order + 1;
    if(o> this.props.listQuestionCode.length) return false;
    else {
      if(o>=3 && o<this.props.listQuestionCode.length)
        $(".pagenumberitem").animate({left: `-${this.unit*(o-2)}px`}, "500");
      let c = this.props.listQuestionCode[o-1];
      this.props.handleSelect(c,o);
    }
  }

  previousQuestion()
  {
    let o = this.props.order - 1;
    if(o<=0) return false;
    else{
      if(o>=2 && o<this.props.listQuestionCode.length-2)
        $(".pagenumberitem").animate({left: `-${this.unit*(o-2)}px`}, "500");
      let c = this.props.listQuestionCode[o-1];
      this.props.handleSelect(c,o);
    }
  }

  render()
  {
    let listItemPage = [];
    listItemPage = this.props.listQuestionCode.map((v,k) => {
      let current = this.props.order===(k+1) ? true : false;
      return <ItemPage key={k} value={v} index={k+1} current={current} selectOption={this.handleSelects.bind(this)}></ItemPage>
    })
    return (
      <div className="Navigate">
        <div className="Pagination">
          <p className="previous" onClick={this.previousQuestion.bind(this)}><img alt="icon" src={arrow} /></p>
          <div className="pagenumber">
            <div className="pagenumberitem">
              {listItemPage}
            </div>
          </div>
          <p className="next" onClick={this.nextQuestion.bind(this)}><img alt="icon" src={arrow} /></p>
        </div>
      </div>
    )
  }
}

class ItemPage extends Component
{
  handleSelect(e)
  {
    e.preventDefault();
    this.props.selectOption(this.props.value,this.props.index);
    return false;
  }
  render()
  {
    let current = this.props.current ? "page page-current" : "page";
    return (
      <div>
        <p className={current} onClick={this.handleSelect.bind(this)}>
          <a role="button">{this.props.index}</a>
        </p>
        <p className="line"></p>
      </div>

    )
  }
}
