main.setCurrentUser();
if(currentUser.role!=="0"){
  main.navigate();
}
var users = [];
$(document).ready(function() {
  main.ajaxGetPromise(`${api.users}?limit=10000`,"")
  .then((rs) => {
    setupUser(rs.data.results);

  })
});
function setupUser(users){
  $(".datatable-api").load();
  let a="";
  users.forEach(elem => {
    try { a += mixDataTable(elem); } catch (err) { console.log(err); }
  });
  $(".datatable-api tbody").html(a);
  main.setupTable();
  deleteFunc(users);
  changeRole(users);
  viewInfor(users);
}
function mixDataTable(a){
  let date = new Date(a.createdAt);
  return `<tr>
              <td>${a.username}</td>
              <td>${a.displayName}</td>
              <td>${a.email}</td>
              <td>${role[a.role][1]}</td>
              <td>${main.formatDateString(date)}</td>
              <td>${main.formatTH(a.activated)}</td>
          		<td class="text-center">
          			<ul class="icons-list">
          				<li class="dropdown">
          					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
          						<i class="icon-menu9"></i>
          					</a>
          					<ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#" class="view" id="view-${a.username}" ><i class="icon-file-text"></i>View Info</a></li>
                      <li><a href="#" class="change-role" id="changerole-${a.username}" ><i class=" icon-spinner10"></i>Change Role</a></li>
          						<li><a href="#" class="delete" id="delete-${a.username}"><i class=" icon-cross2"></i>Blocked</a></li>
          					</ul>
          				</li>
          			</ul>
          		</td>`
}
function deleteFunc(users){
  $(".delete").click(function(event) {
    try {
      let id = $(this).attr('id').split('-')[1],that = this;
      event.preventDefault();
      main.confirm(`Confirm blocked user: ${id}`)
      .then(()=>{
        main.ajaxDeletePromise(`${api.users}/${id}`)
        .then((rs) => {
          main.handleResult(rs.data.code,rs.data.message);
          $(that).parent().parent().parent().parent().parent().parent()
          .children('td:nth-child(6)').html(main.formatTH(2));
        })
      },()=>{});
    } catch (err) {
      console.log(err);
    }
  });
}
function changeRole(users){
  $(".change-role").click(function(event) {
    event.preventDefault();
    let id = $(this).attr('id').split('-')[1],that = this;
    let user = users.find(w=>w.username===id);
    main.prompt("Change User Role","List role for user:",function(){
      $(".ui-pnotify-action-bar input").replaceWith(main.renderSelectRole(user.role));
    },function(){
      let value = $(".ui-pnotify-action-bar select").val();
      if(user.role!=value){
        main.confirm(`Confirm change user role [${role[value][1]}]: ${id}`)
        .then(()=>{
          main.ajaxPutPromise(`${api.changeRole}/${user.username}?r=${value}`)
          .then((rs) => {
            main.handleResult(rs.data.code,rs.data.message);
            $(that).parent().parent().parent().parent().parent().parent()
            .children('td:nth-child(4)').html(role[value][1]);
          })
        },()=>{});
      }
    })
  });
}
function viewInfor(users){
  $(".view").click(function(event) {
    event.preventDefault();
    try {
      let id = $(this).attr('id').split('-')[1],that = this;
      let user = users.find(w=>w.username===id);
      main.showInfo(`User Information: ${user.username}`,inforUser(user),"info");
    } catch (err) {
      console.log(err);
    }
  });
}
function inforUser(user){
  return `<label class="control-label"><strong>Username</strong>: ${user.username}</label><br>
  <label class="control-label"><strong>Activated Date</strong>: ${main.formatDateString(new Date(user.activatedAt))}</label><br>
  <label class="control-label"><strong>Display Name</strong>: ${main.format(user.displayName)}</label><br>
  <label class="control-label"><strong>Status</strong>: ${main.format(main.formatTH(user.activated))}</label><br>
  <label class="control-label"><strong>Email</strong>: ${main.format(user.email)}</label><br>
  <label class="control-label"><strong>Phone</strong>: ${main.format(user.phone)}</label><br>
  <label class="control-label"><strong>Address</strong>: ${main.format(user.address)}</label><br>
  <label class="control-label"><strong>Role</strong>: ${main.format(role[parseInt(user.role)][1])}</label><br>
  <label class="control-label"><strong>Register Date</strong>: ${main.format(main.formatDateString(new Date(user.createdAt)))}</label><br>
  <label class="control-label"><strong>Update Date</strong>: ${main.format(main.formatDateString(new Date(user.updatedAt)))}</label><br>`;
}
