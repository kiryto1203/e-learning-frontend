class categoryDto{
  constructor(categoryCode,categoryIntro,categoryDate,lastUpdateDate,subcategoriesName){
    this.categoryCode = categoryCode || "",
    this.categoryIntro = categoryIntro || "",
    this.categoryDate = categoryDate || "",
    this.lastUpdateDate = lastUpdateDate || "",
    this.subcategoriesName = subcategoriesName || []
  }
}
class subcategoryDto{
  constructor(subcategoryCode,displayName,subcategoryIntro,creationDate,lastUpdateDate,category){
    this.subcategoryCode = subcategoryCode || null;
    this.displayName = displayName || null;
    this.subcategoryIntro = subcategoryIntro;
    this.creationDate = creationDate || main.now.getTime();
    this.lastUpdateDate = lastUpdateDate || main.now.getTime();
    this.category = new categoryDto();
  }
}
class question{
  constructor(questionCode,questionType,questionContent,questionParentCode,creationDate,lastUpdateDate,creatorUsername,lastUpdaterUsername,point,subcategory){
    this.questionCode = questionCode || null;
    this.questionType = questionType || 1;
    this.questionParentCode = questionParentCode || null;
    this.creationDate = creationDate || main.now.getTime();
    this.lastUpdateDate = lastUpdateDate || main.now.getTime();
    this.creatorUsername = currentUser.username || "",
    this.lastUpdaterUsername = currentUser.username || "",
    this.point = point || 1;
    this.subcategory = subcategory || new subcategoryDto();

  }
}
class answer{
  constructor(answerCode,answerContent,creationDate,lastUpdateDate,creatorUsername,lastUpdaterUsername){
    this.answerCode = answerCode || null;
    this.answerContent = answerContent || null;
    this.creationDate = creationDate || main.now.getTime();
    this.lastUpdateDate = creationDate || main.now.getTime();
    this.creatorUsername = currentUser.username || "";
    this.lastUpdaterUsername = currentUser.username || "";
  }
}
class systemResult{
  constructor(questionBankDto,answerBankDto,systemResultPosition,systemResultIsCorrect,creationDate,lastUpdateDate,lastUpdaterUsername){
    this.questionBankDto = questionBankDto || new question();
    this.answerBankDto = answerBankDto || new answer();
    this.systemResultPosition = systemResultPosition || null;
    this.systemResultIsCorrect = systemResultIsCorrect || 0;
    this.creationDate = creationDate || main.now.getTime();
    this.lastUpdateDate = lastUpdateDate || main.now.getTime();
    this.lastUpdaterUsername = lastUpdaterUsername || currentUser.username;
  }
}
class answers{
  constructor(answerBankDto,systemResultDto){
    this.answerBankDto = answerBankDto || new answer();
    this.systemResultDto = systemResultDto || new systemResult();
  }
}
class questionDto{
  constructor(questionBankDto,answerDtos){
    this.questionBankDto = questionBankDto || new question();
    this.answerDtos = this.answerDtos || [];
  }
}

var questionCode="";
try {
  questionCode = main.getParameterURL("questionCode");
} catch (err) { console.log(err);}
var varQuestions = [new questionDto()];
var answerBank = [];
var categories = [];

if(localStorage.getItem('categories') && main.isValid(localStorage.getItem('categories')))
  categories = JSON.parse(localStorage.getItem('categories'));
if(localStorage.getItem('answers') && main.isValid(localStorage.getItem('answers')))
  answerBank = JSON.parse(localStorage.getItem('answers'));
if(localStorage.getItem('questions') && main.isValid(localStorage.getItem('questions'))){
  varQuestions = JSON.parse(localStorage.getItem('questions'));
}
localStorage.setItem('questions',JSON.stringify(varQuestions));
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      categories: [],
      subcateNumber: 0,
      cateNumber: 0,
      subcategory: [],
      subcategoryCode: [],
      questionNumber: varQuestions.length,
    }
  }
  componentWillMount(){
    if(main.isValid(questionCode))
      this.fetchDataFromQuestionCode(questionCode);
    else
      this.createNewData()
  }
  createNewData(){
    let that = this,array=[];
    if(!localStorage.getItem('categories') || localStorage.getItem('categories')==="undefined"){
      Promise.all([main.ajaxGetPromise(`${api.categories}?limit=1000`,"GET"),  main.ajaxGetPromise(`${api.answers}?limit=10000`,"GET")])
      .then((rs) => {
        categories = rs[0].data.results;
        answerBank = rs[1].data.results;
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('answers', JSON.stringify(answerBank));
        categories.forEach(elem => { array.push(elem); });
        varQuestions[0].questionBankDto.subcategory.subcategoryCode
          = array[that.state.cateNumber].subcategoriesCode[0];
        varQuestions[0].questionBankDto.questionCode = that.state.questionNumber;
        localStorage.setItem('questions',JSON.stringify(varQuestions));
        that.setState({
          categories: array,
          subcategory: array[that.state.cateNumber].subcategoriesName,
          subcategoryCode: array[that.state.cateNumber].subcategoriesCode
        });
      })
    }else{
      array = JSON.parse(localStorage.getItem('categories'));
      for (let i = 0,size = array.length; i < size; i++) {
        let index = array[i].subcategoriesCode.findIndex(x => x===varQuestions[0].questionBankDto.subcategory.subcategoryCode);
        if(index>=0){
          that.setState({
            subcateNumber: index,
            subcategory: array[i].subcategoriesName,
            subcategoryCode: array[i].subcategoriesCode,
            categories: array,
            cateNumber: i,});
          break;
        }
      }
    }
  }
  fetchDataFromQuestionCode(questionCode){
    let that = this,array=[];
    Promise.all([main.ajaxGetPromise(`${api.categories}?limit=1000`,""),
    main.ajaxGetPromise(`${api.answers}?limit=10000`,""),
    main.ajaxGetPromise(`${api.questions}/${questionCode}`,"")])
    .then((rs) => {
      console.log(rs);
      if(rs[2].data.code!=="200"){
        console.log(elem.data.code);
        main.handleResult(elem.data.code,elem.data.message);
        check=false;
      }{
        categories = rs[0].data.results;
        answerBank = rs[1].data.results;
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('answers', JSON.stringify(answerBank));
        categories.forEach(elem => { array.push(elem); });
        varQuestions = [];
        varQuestions.push(rs[2].data.data);
        localStorage.setItem('questions',JSON.stringify(varQuestions));
        that.setState({
          categories: array,
          subcategory: array[that.state.cateNumber].subcategoriesName,
          subcategoryCode: array[that.state.cateNumber].subcategoriesCode
        });
      }
    })
  }
  handelSelectCate(e){
      let position = this.state.categories.findIndex(w => w.categoryCode===e);
      for (let i = 0,size= varQuestions.length; i < size; i++) {
        varQuestions[i].questionBankDto.subcategory.subcategoryCode = this.state.categories[position].subcategoriesCode[0];
      }
      localStorage.setItem('questions',JSON.stringify(varQuestions));
      this.setState({
        cateNumber: position,
        subcategory: this.state.categories[position].subcategoriesName,
        subcategoryCode: this.state.categories[position].subcategoriesCode,
       });
  }
  handleAddQuestion(){
    var varQuestion = new questionDto();
    varQuestion.questionBankDto.questionParentCode = varQuestions[0].questionBankDto.questionCode;
    varQuestion.questionBankDto.questionCode =  varQuestions[this.state.questionNumber-1].questionBankDto.questionCode + 1;;
    varQuestion.questionBankDto.subcategory = varQuestions[0].questionBankDto.subcategory;
    varQuestion.questionBankDto.questionType = 1;
    varQuestion.questionBankDto.point = 1;
    varQuestions.push(varQuestion);
    localStorage.setItem('questions',JSON.stringify(varQuestions));
    this.setState({questionNumber: this.state.questionNumber+1});
  }
  handleDeleteQuestion(e){
    let order = varQuestions.findIndex(w=>w.questionBankDto.questionCode===e);
    varQuestions.splice(order,1);
    localStorage.setItem('questions',JSON.stringify(varQuestions));
    this.setState({questionNumber: this.state.questionNumber-1});
  }
  handelDelteForwardChange(){
    this.setState({questionNumber: varQuestions.length});
  }
  handleSubmit(){
    main.startProcess(".submit");
    if(main.isValid(questionCode)){
      main.ajaxPutPromise(api.questions,JSON.stringify(varQuestions[0]))
      .then((rs) => {
        main.handleResult(rs.data.code,rs.data.message);
        main.endProcess(".submit");
        localStorage.removeItem("questions");
      },(rs)=>{
        main.handleResult("999");
        main.endProcess(".submit");
      });
    }else {
      main.ajaxPostPromise(api.questions,JSON.stringify(varQuestions))
      .then((rs) => {
        main.handleResult(rs.data.code,rs.data.message);
        main.endProcess(".submit");
        localStorage.removeItem("questions");
      },(rs)=>{
        main.handleResult("999");
        main.endProcess(".submit");
      });
    }

    return false;
  }
  render(){
    let listQuestion = [];
    for (let i = 0; i < varQuestions.length; i++) {
      listQuestion.push(<QuestionType key={main.guid()}
        qustionCode={varQuestions[i].questionBankDto.questionCode}
        questionNumber={this.state.questionNumber}
        handleAddQuestion={this.handleAddQuestion.bind(this)}
        questionNumber={i} handleDeleteQuestion={this.handleDeleteQuestion.bind(this)}
        handelDelteForwardChange={this.handelDelteForwardChange.bind(this)}/>);
    }
    return (
      <form className="form-horizontal" action="#">
        <Category categories={this.state.categories} handelSelectCate={this.handelSelectCate.bind(this)}
           cateNumber={this.state.cateNumber}/>
        <SubCategory subcategory={this.state.subcategory} subcateNumber={this.state.subcateNumber}
          subcategoryCode={this.state.subcategoryCode}/>
        {listQuestion}
        <div className="form-group">
            <div className="text-right">
              <button type="button" className="btn btn-primary submit" onClick={this.handleSubmit.bind(this)}>
                <a href="#last">Submit </a>
                <i className="icon-arrow-right14 position-right"></i></button>
            </div>
        </div>
      </form>
    )
  }
}

class Category extends React.Component {
  handelSelectCate(e){
    this.props.handelSelectCate(e.target.value);
  }
  render(){
    let categories="";
    if(this.props.categories){
      let that = this;
        categories = this.props.categories.map((v,k)=>{
            return <SelectItem value={v.categoryCode} content={v.categoryCode} key={k} isSelected={k===that.props.cateNumber}/>
        })
    }
    return(
      <div className="form-group">
				<label className="control-label col-lg-2"><strong>Category</strong></label>
          <div className="col-lg-10">
            <select className="form-control" onChange={this.handelSelectCate.bind(this)}>
             {categories}
           </select>
  				</div>
			</div>

    )
  }
}

class SubCategory extends React.Component {
    handelSelectSubCate(e){
      let index = this.props.subcategory.findIndex(w=>w===e.target.value);
      for (let i = 0,size= varQuestions.length; i < size; i++) {
        varQuestions[i].questionBankDto.subcategory.subcategoryCode = this.props.subcategoryCode[index];
      }
      localStorage.setItem('questions',JSON.stringify(varQuestions));
    }
    render(){
      let categories="",that=this;
      if(this.props.subcategory){
        let that = this;
          categories = this.props.subcategory.map((v,k)=>{
            return <SelectItem value={that.props.subcategoryCode[k]} content={v}
              key={main.guid()} isSelected={k===that.props.subcateNumber} />
          })
      }
      return(
        <div className="form-group">
  				<label className="control-label col-lg-2"><strong>SubCategory</strong></label>
            <div className="col-lg-10">
              <select className="form-control" onChange={this.handelSelectSubCate.bind(this)}>
               {categories}
             </select>
    				</div>
  			</div>
      )
    }
}

class QuestionType extends React.Component{
  constructor(props){
    super();
    this.state = {
      questionCode: varQuestions[props.questionNumber].questionBankDto.questionCode || 1,
      questionType : varQuestions[props.questionNumber].questionBankDto.questionType || 1,
      level: getLevel(varQuestions,varQuestions[props.questionNumber].questionBankDto.questionCode || 1),
      point: varQuestions[props.questionNumber].questionBankDto.point || 1
    }
  }
  handleSelectQuestionType(e){
    let value = e.target.value,that = this,
        old = varQuestions[this.props.questionNumber].questionBankDto.questionType;
    if(old==3 || value=="3"){
      main.confirm(`You are changing question type between Paragraph and other question type.\n
        All your question childs or answers will be delete.`)
        .then(()=>{
          let array=[];
          varQuestions.forEach((v,k) => {
            if(v.questionBankDto.questionParentCode==varQuestions[that.props.questionNumber].questionBankDto.questionCode)
              array.push(k);
          });
          array.forEach(elem => { varQuestions.splice(array[0],1); });
          varQuestions[that.props.questionNumber].questionBankDto.questionType = parseInt(value);
          varQuestions[that.props.questionNumber].answerDtos = [];
          localStorage.setItem('questions',JSON.stringify(varQuestions));
          that.setState({questionType: parseInt(value)});
          this.props.handelDelteForwardChange();
        },()=>{
          $(`#${this.props.questionNumber}-select`).val(3);
        })
    }else{
      varQuestions[that.props.questionNumber].questionBankDto.questionType = parseInt(value);
      localStorage.setItem('questions',JSON.stringify(varQuestions));
      that.setState({questionType: parseInt(value)});
    }
  }
  handleAddQuestion(){
    this.props.handleAddQuestion();
  }
  handleDeleteQuestion(e){
    this.props.handleDeleteQuestion(this.state.questionCode);
    return false;
  }
  handleChangePoint(e){
    if(varQuestions[this.props.questionNumber].questionBankDto.questionType==3){
      main.notify("Can't change point of Paragraph Question Type.")
    }else{
      varQuestions[this.props.questionNumber].questionBankDto.point = e;
      localStorage.setItem('questions',JSON.stringify(varQuestions));
    }
  }
  componentDidMount(){
    $("a[href='#']").click(function(e){
      e.preventDefault();
    })
  }
  render(){
    let list = [];
    let that = this;
    for(let [k,v] of questionType.entries()){
      list.push(<SelectItem value={k} content={v} key={k} isSelected={k==this.state.questionType}/>)
    }
    console.log(varQuestions);
    let description = varQuestions[this.props.questionNumber].questionBankDto.questionParentCode == null
    ? "" : `Question ${varQuestions[this.props.questionNumber].questionBankDto.questionParentCode} Child`;
    let indent = "-- ".repeat(this.state.level);
    let idName = `${this.props.questionNumber}-select`;
    return(
      <div>
        <div className="form-group">
          <label className="control-label col-lg-2"><strong>Question {this.state.questionCode}:</strong></label>
          <label className="control-label col-lg-10">
            <label className="control-label text-left col-lg-2">{description}</label>
            {this.state.level!== 0 ? (<label className="control-label text-right col-lg-10">
                <a href="#" className="delete" onClick={this.handleDeleteQuestion.bind(this)} >Delete <i className="icon-cross3"></i></a>
              </label>) : ""}
          </label>
        </div>
        <div className="form-group">
          <label className="control-label col-lg-2">{indent} Question Type - Point</label>
            <div className="col-lg-5">
              <select className="form-control" id={idName} onChange={this.handleSelectQuestionType.bind(this)}>
               {list}
             </select>
            </div>
            <QuesitonPoint key={main.guid()} questionNumber={this.props.questionNumber} handleChangePoint={this.handleChangePoint.bind(this)}
              point={this.state.point} questionType={this.state.questionType}/>
        </div>
        <QuestionForm key={main.guid()} questionType={this.state.questionType}
          questionNumber = {this.props.questionNumber}
          handleAddQuestion={this.handleAddQuestion.bind(this)}
          level={this.state.level}/>
      </div>
    )
  }
}

class QuesitonPoint extends React.Component{
  handleChangePoint(e){
    this.props.handleChangePoint(e.target.value);
  }
  render(){
    return(
      <div className="col-lg-5">
        {
            this.props.questionType == 3
            ? <input type="number" className="form-control" placeholder="Enter Question Point"
                  defaultValue="0" disabled
                  onChange={this.handleChangePoint.bind(this)}/>
            : <input type="number" className="form-control" placeholder="Enter Question Point"
                  defaultValue={this.props.point}
                  onChange={this.handleChangePoint.bind(this)}/>
        }

      </div>
    )
  }
}

class QuestionForm extends React.Component{
  constructor(props){
    super();
    this.state ={
      level: props.level,
      questionType: props.questionType,
      answers: varQuestions[props.questionNumber].answerDtos,
      statusButton: varQuestions[props.questionNumber].questionBankDto.questionContent
      ? varQuestions[props.questionNumber].questionBankDto.questionContent.length!==0
      : 0
    }
  }

  handleChangeQuestion(e,value){
    if(varQuestions.findIndex(w=>w.questionBankDto.questionContent===value)>=0){
      PNotify.prototype.options.delay = 200000;
      main.notify("Question content can't same.",3);
    }else{
      PNotify.removeAll();
      PNotify.prototype.options.delay = 4000;
      varQuestions[this.props.questionNumber].questionBankDto.questionContent = value;
      localStorage.setItem('questions',JSON.stringify(varQuestions));
    }
    if(!value)
      this.setState({answers: [],statusButton: false});
    else if(e.length===0 || !value)
      this.setState({answers: [],statusButton: true});
    else
      this.setState({answers: [], statusButton: false});
  }

  handleAddAnswer(){
    var ans = new answers();
    ans.systemResultDto.systemResultPosition = 1;
    varQuestions[this.props.questionNumber].answerDtos.push(ans);
    localStorage.setItem('questions',JSON.stringify(varQuestions));
    this.setState({answers: varQuestions[this.props.questionNumber].answerDtos});
  }

  handleAddQuestion(){
    this.props.handleAddQuestion();
  }

  handleDeleteAnswer(){
    $("#root").load();
    this.setState({ answers: varQuestions[this.props.questionNumber].answerDtos });

  }

  switchQuestionType(questionType){
    if(questionType===3 || questionType==="3"){
      return ( <div>
                <ButtonAddQuestion questionType={this.props.questionType} handleAddQuestion={this.handleAddQuestion.bind(this)}/>
              </div> )
    }else{
      return ( <div>
                  <Answers questionNumber={this.props.questionNumber} answers={this.state.answers}
                    handleDeleteAnswer={this.handleDeleteAnswer.bind(this)} answerNumber={this.state.answers.length}/>
                  <ButtonAddAnswer questionType={this.props.questionType} questionNumber={this.props.questionNumber}
                    handleAddAnswer={this.handleAddAnswer.bind(this)}
                     status={this.state.statusButton} />
                </div> )
    }
  }

  render(){
    return(
      <div>
        <Question handleChangeQuestion={this.handleChangeQuestion.bind(this)} level={this.state.level}
          questionNumber={this.props.questionNumber} />
        {this.switchQuestionType(this.props.questionType)}
      </div>
    )
  }
}

class Question extends React.Component{
  constructor(props){
    super();
    this.state={
      level: props.level
    }
  }
  handleChangeQuestion(e){
    this.props.handleChangeQuestion(v.words(e.target.value, whitespaceAnswer),e.target.value);

  }
  render(){
    let indent = "-- ".repeat(this.state.level);
    let rows = varQuestions[this.props.questionNumber].questionBankDto.questionType === 3 ? 10 : 3;
    return (
      <div className="form-group">
        <label className="control-label col-lg-2">{indent} Question Content</label>
          <div className="col-lg-10">
            <textarea rows={rows} cols="10" className="form-control"
              placeholder="Use '_(number)_' to add answer with number is position question's answer"
              onChange={this.handleChangeQuestion.bind(this)}
              defaultValue={varQuestions[this.props.questionNumber].questionBankDto.questionContent}>
            </textarea>
            <span></span>
          </div>
      </div>
    )
  }
}

class ButtonAddAnswer extends React.Component {
  handleAddAnswer(){
    if(this.props.status)
      this.props.handleAddAnswer();
  }

  render(){
    let status = this.props.status ? "btn btn-primary" : "btn btn-primary disabled";
    return (
      <div className="form-group">
        <label className="control-label col-lg-2"></label>
          <div className="col-lg-10 text-left">
            <button type="button" className={status} onClick={this.handleAddAnswer.bind(this)}>
              Add Answer
              <i className="icon-googleplus5"></i>
            </button>
          </div>
      </div>
    )
  }
}

class ButtonAddQuestion extends React.Component {

  handleAddQuestion(){
    this.props.handleAddQuestion();
  }

  render(){
    let status = "btn btn-primary fix-scroll";
    return (
      <div className="form-group">
        <label className="control-label col-lg-2">Question Child</label>
          <div className="col-lg-10 text-left">
            <button type="button" className={status} onClick={this.handleAddQuestion.bind(this)}>
              <a href="#last">Add Child Question </a>
              <i className="icon-googleplus5"></i></button>
          </div>
      </div>
    )
  }
}

class Answers extends React.Component {
  constructor(props){
    super();
    this.state={
      answerNumber: props.answerNumber
    }
  }
  handleDeleteAnswer(){
    this.setState({numberAnswer: this.state.numberAnswer--});
    this.props.handleDeleteAnswer();
  }
  render(){
    let answer = this.props.answers;
    let listAnswer = [];
    if(answer.length){
      let i = -1,that = this;
      listAnswer = answer.map((v,k)=>{
        i++;
        return <AnswerItem key={main.guid()} value={that.props.answers[i].answerBankDto.answerContent} order={i}
           isCorrect={that.props.answers[i].systemResultDto.systemResultIsCorrect} answerNumber={that.state.answerNumber}
           handleDeleteAnswer={that.handleDeleteAnswer.bind(that)} questionNumber={that.props.questionNumber}/>;
      })
    }
    return(
      <div>
        {listAnswer}
      </div>
    )
  }
}

class AnswerItem extends React.Component {
  constructor(props){
    super();
    this.state = {
      order: props.order+1,
      content: varQuestions[props.questionNumber].answerDtos[props.order].answerBankDto.answerContent,
      isChecked: varQuestions[props.questionNumber].questionBankDto.questionType==4 ? true : props.isCorrect==1,
      className: `form-control col-lg-6 answer-bank-${props.questionNumber}-${props.order+1}`
    }
  }

  handleChangeAnswer(f,e){
    let className = `.answer-bank-${this.props.questionNumber}-${this.state.order}`;
    let value = e.target.value;
    $(className).bind('typeahead:selected', function(obj, datum, name) {
      value = datum.value;
    });
    if(varQuestions[this.props.questionNumber].answerDtos.findIndex(w=>w.answerBankDto.answerContent===value)>=0){
      PNotify.prototype.options.delay = 20000;
      main.notify("Answers can't same in on a question.",3);
    }else{
      PNotify.removeAll();
      PNotify.prototype.options.delay = 4000;
      varQuestions[this.props.questionNumber].answerDtos[this.props.order].answerBankDto.answerContent = value;
      localStorage.setItem('questions',JSON.stringify(varQuestions));
    }
    console.log(varQuestions);
  }

  handleChangeCorrect(e){
    if(varQuestions[this.props.questionNumber].questionBankDto.questionType!=4){
      varQuestions[this.props.questionNumber].answerDtos[this.props.order].systemResultDto.systemResultIsCorrect
      = !this.state.isChecked ? 1 : 0;
      localStorage.setItem('questions',JSON.stringify(varQuestions));
      this.setState({isChecked: this.state.isChecked ? false : true });
    }
  }

  handleDeleteAnswer(e){
    varQuestions[this.props.questionNumber].answerDtos.splice(this.props.order,1);
    localStorage.setItem('questions',JSON.stringify(varQuestions));
    this.props.handleDeleteAnswer();
  }

  substringMatcher(strs) {
          return function findMatches(q, cb) {
              var matches, substringRegex, matches = [];
              let substrRegex = new RegExp(q, 'i');
              $.each(strs, function(i, str) {
                  if (substrRegex.test(str)) {
                      matches.push({ value: str });
                  }
              });
              cb(matches);
          };
      };

  componentDidMount(){
    let answerLocal = answerBank.map(elem => { return elem.answerContent;});
    typeahead.call(this,`answer-bank-${this.props.questionNumber}-${this.state.order}`,answerLocal);
    if(varQuestions[this.props.questionNumber].questionBankDto.questionType==4){
      $(`.${this.props.questionNumber}-correct`).click(function(event) {
        event.preventDefault();
        main.notify("This question type don't have incorrect answer.");
      });
    }
  }

  render(){
    let content ="";
    if(varQuestions[this.props.questionNumber].answerDtos[this.props.order]!=null)
      content = varQuestions[this.props.questionNumber].answerDtos[this.props.order].answerBankDto.answerContent;
    let className=`${this.props.questionNumber}-${this.props.order}-correct`;
    return(
      <div className="form-group">
        <label className="control-label col-lg-2">Answer {this.state.order}</label>
          <button type="button" className="btn btn-danger" onClick={this.handleDeleteAnswer.bind(this)}>
            Delete
            <i className="icon-cross2"></i></button>
          <div className="col-lg-5">
            <input type="text" className={this.state.className}
              ref="question" data-width="50%" defaultValue={content}
              onChange={this.handleChangeAnswer.bind(this,this.props.questionNumber)}/>
          </div>
          <div className="col-lg-3">
            <input type="checkbox" defaultChecked={this.state.isChecked}
              onChange={this.handleChangeCorrect.bind(this)}
              className={className}/>
            <label className="control-label col-lg-3">Correct</label>
          </div>
      </div>
    )
  }
}

class SelectItem extends React.Component{
    render(){
      return(
        <option value={this.props.value} selected={this.props.isSelected} >{this.props.content}</option>
      )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// function validateQuestion(question){
//   switch (question.questionBankDto.questionType) {
//     case 1:
//       if(!question.questionBankDto.questionContent){
//         main.notify("Question content is not emtpty");
//         return false;
//       }
//       if(question.questionBankDto.point<0){
//         main.notify("Question point can't be less than 0");
//         return false;
//       }
//       if(question.answerDtos.length<2){
//         main.handleResult("104");
//         return false;
//       }
//       if()
//
//
//       break;
//     case 2:
//       break;
//     case 3:
//       break;
//     case 4:
//       break;
//     default:
//
//   }
// }
function getLevel(varQuestions,questionCode){
  let varQuestionLocal = varQuestions.find(w=> w.questionBankDto.questionCode==questionCode);
  if(varQuestionLocal == null || !varQuestionLocal.questionBankDto.questionParentCode) return 0;
  return getLevel(varQuestions,varQuestionLocal.questionBankDto.questionParentCode) + 1;
}
function typeahead(className,answerLocal){
  $(`.${className}`).typeahead(
          {
              hint: true,
              highlight: true,
              minLength: 1
          },
          {
              name: 'answerLocal',
              displayKey: 'value',
              source: this.substringMatcher(answerLocal)
          }
      );
}
