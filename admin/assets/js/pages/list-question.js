var questions = [];
$(document).ready(function() {
  main.ajaxGetPromise(`${api.questionBank}?limit=10000`,"")
  .then((rs) => {
    setupListQuestion(rs.data.results);
  })
});
function setupListQuestion(questions){
  $(".datatable-api").load();
  let a="";
  questions.forEach(elem => {
    try { a += mixDataTable(elem); } catch (err) { console.log(err); }
  });
  $(".datatable-api tbody").html(a);
  main.setupTable();
  deleteFunc(questions);
}
function mixDataTable(a){
  return `<tr>
              <td>${a.questionCode}</td>
              <td>${a.subcategory.category.categoryCode}</td>
              <td>${a.subcategory.subcategoryCode}</td>
              <td>${questionType.get(a.questionType)}</td>
              <td>${a.point}</td>
          		<td class="text-center">
          			<ul class="icons-list">
          				<li class="dropdown">
          					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
          						<i class="icon-menu9"></i>
          					</a>
          					<ul class="dropdown-menu dropdown-menu-right">
          						<li><a href="add-question.html?questionCode=${a.questionCode}" ><i class="icon-hammer"></i>Modify</a></li>
          						<li><a href="#" class="delete" id="delete-${a.questionCode}"><i class=" icon-cross2"></i>Remove</a></li>
          					</ul>
          				</li>
          			</ul>
          		</td>`
}
function deleteFunc(questions){
  $(".delete").click(function(event) {
    try {
      let id = $(this).attr('id').split('-')[1],that = this;
      event.preventDefault();
      main.confirm(`Confirm delete question: ${id}`)
      .then(()=>{
        main.ajaxDeletePromise(`${api.questions}/${id}`)
        .then((rs) => {
          main.handleResult(rs.data.code,rs.data.message);
          let index = questions.findIndex(w=> w.questionCode===id);
          questions.splice(index,1);
          setupListQuestion(questions);
        })
      },()=>{});
    } catch (err) {
      console.log(err);
    }
  });
}
