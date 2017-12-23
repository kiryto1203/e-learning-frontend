main.setCurrentUser();
if(["0","1","2","3"].findIndex(w=>w===currentUser.role)<0){
  main.navigate();
}
$(document).ready(function() {
  main.ajaxGetPromise(`${api.users}/${currentUser.username}`,"")
  .then((rs) => {
    if(rs.data.code!=="200") main.handleResult(ra.data.code);
    setupData(rs.data.data);
    submit(rs.data.data);
  })
});
function setupData(user){
  $("input[name=username]").val(user.username);
  $("input[name=activatedAt]").val(main.format(main.formatDateString(new Date(user.activatedAt))));
  $("span[name=activated]").html(main.format(main.formatTH(user.activated)));
  $("input[name=email]").val(main.format(user.email));
  $("input[name=role]").val(main.format(role[parseInt(user.role)][1]));
  $("input[name=createdAt]").val(main.format(main.formatDateString(new Date(user.createdAt))));
  $("input[name=displayName]").val(main.format(user.displayName));
  $("input[name=phone]").val(main.format(user.phone));
  $("input[name=address]").val(main.format(user.address));
}
function submit(user){
  $(".submit").click(function(event) {
    main.startProcess(".submit");
    event.preventDefault();
    user.displayName = $("input[name=displayName]").val();
    user.phone = $("input[name=phone]").val();
    user.address = $("input[name=address]").val();
    main.prompt("Confirm change information","Enter your password to change information",function(){
      $(".ui-pnotify-action-bar input").attr('type', 'password');
    },()=>{}).then((rs) => {
      user.password = rs;
      main.ajaxPutPromise(`${api.users}/${user.username}`,JSON.stringify(user))
      .then((rs) => {
        console.log(rs.xhr.getResponseHeader("authorization"));
        localStorage.setItem('bear',rs.xhr.getResponseHeader("authorization"));
        main.setCurrentUser();
        $(".img-user").attr("src", host+currentUser.avatar);
        $(".displayname-user").html(currentUser.displayName);
        $(".role-user").html(`<i class="icon-user-check"></i>&nbsp&nbsp&nbsp${role[currentUser.role][1]}`);
        main.handleResult(rs.data.code,rs.data.message);
        main.endProcess(".submit");
      },()=>{main.endProcess(".submit");})
    },()=>{main.endProcess(".submit");})

  });
}
