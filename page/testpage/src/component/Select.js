import React, {Component} from 'react';
import '../css/Navigate.css';
import arrow_select from '../image/arrow_select.png';
import $ from 'jquery';
import tick from '../image/tick.png';

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
    this.numberOfQuestionComplete = 0;
    this.unit = window.innerWidth <= 320 ? 50 : 80;
  }

  showOption()
  {
    /*
      hien thi / an danh sach option
    */
    $(".select .option").animate({height: `${this.state.show ? '0px' : '160px'}` }, 200);
    this.setState({show: !this.state.show});
    let that = this;
    $(document).off('click').click(function(event) {
      if(!$(event.target).closest('.select').length && that.state.show) {
        $(".select .option").animate({height: `${that.state.show ? '0px' : '160px'}` }, 200);
        that.setState({show: !that.state.show});
      }
    });
  }

  handleSelects(c,o)
  {
    /*
      Xu ly event chon option
      => thay doi cau hoi hien tai
    */
    let change=this.unit*(o-2);
    if(o===20) change=this.unit*(o-3);
    if(o===1) change=this.unit*(o-1);
    $(".pagenumberitem").animate({left: `-${change}px`}, "500");
    this.props.handleSelect(c,o);
  }

  animateProgress(current,total)
  {
    var unit = 100 / total;
    setTimeout(function () {
        $("#myProgress").animate({"width": `${unit * current}%`}, 500);
        setTimeout(function(){
          $("#myProgress").text(current);
        },250);
      },300);
  }

  componentDidMount()
  {
    this.animateProgress(this.numberOfQuestionComplete,this.props.listQuestionCode.length);
  }

  componentDidUpdate()
  {
    this.animateProgress(this.numberOfQuestionComplete,this.props.listQuestionCode.length);
  }

  render()
  {
    let answers = this.props.answers,
        listItem = [], // luu mang option cho select
        select = "", // chua hinh anh neu question hien tai da hoan thanh
        numberOfQuestionComplete = 0;
    listItem = this.props.listQuestionCode.map((v,k)=>{
      let selected=false,a;
      if(answers){
        a = answers.find(w=>w.question_code===v).answer; // lay cau tra loi tu localStorage
        selected = a.length>0 ? true : false; // kiem tra gia tri co hay khong
        /*
          Neu phan tu hien tai trong vong lap = phan tu hien tai hien thi tren selected
          va phan tu co cau tra loi thi hien thi hinh anh
          Chi lay select 1 lan, co du lieu se k lay them
          order[1,20]
          k[0,19]
        */
        if(!select)
          select = selected && (this.props.order-1)===k
                ? <img alt="icon" className="img-tick" src={tick}/>
                : "";
        // So question hoan thanh
        numberOfQuestionComplete += selected ? 1 : 0;
      }
      return <Item key={k} value={v} index={k+1} selectOption={this.handleSelects.bind(this)} selected={selected}></Item>
    });
    this.numberOfQuestionComplete = numberOfQuestionComplete;
    return (
      <div className="Navigate">
        <div className="Selection">
          <div className="select" onClick={this.showOption.bind(this)}>
            <p>Question {this.props.order} {select}</p>
            <img src={arrow_select} className="img" alt="icon" />
            <div className="option">
              <ul>
                {listItem}
              </ul>
            </div>
          </div>
          <div className="progress">
            <div id="myProgress">|</div>
          </div>
        </div>
      </div>
    )
  }
}

class Item extends Component
{
  handleSelect()
  {
    this.props.selectOption(this.props.value,this.props.index);
  }

  render()
  {
    let a = this.props.selected
          ? <img alt="icon" className="img-tick" src={tick}/>
          : "";
    return (
      <li ref={this.props.value} onClick={this.handleSelect.bind(this)}>
        Question {this.props.index}
        {a}
      </li>
    )
  }
}
