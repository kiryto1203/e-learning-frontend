class userLogin{
  constructor(username="",password=""){
    this.username = username,
    this.password = password
  }
}
function isValid(data){
  PNotify.removeAll();
  if(!data.username || !data.password){
    main.notify("UserName and Password is not empty.",3);
    return false;
  }
  if(data.password<6){
    main.notify("Password is invalid",3);
    return false;
  }
  return true;
}
function login(){
  main.startProcess(".login-form");
  let data = new userLogin(
    $("input[name=username]").val(),
    $("input[name=password]").val()
  );
  if(!isValid(data)){
    main.endProcess(".login-form");
    return false;
  }
  $.ajax({
    "xhrFields": {
      withCredentials: true
    },
    "url": api.login,
    "type": "POST",
    "data": data,
  })
  .done(function(data,status,xhr) {
    try { data = JSON.parse(data); } catch (err) {}
    if(data.code==="200"){
      main.setCurrentUser();
      if(currentUser.role=="4"){
        main.handleResult("403");
      }else{
        localStorage.setItem('bear',data.data);
        main.endProcess(".login-form");
        setTimeout(function () {
          main.notify("Login success.",2);
          main.navigate();
        });
      }
    }else
      main.handleResult(data.code.toString());
  })
  .fail(function(xhr,status,error) {
    main.endProcess(".login-form");
  });
}
function clear(){
  $("input[name=username]").val("");
  $("input[name=password]").val("");
}
$(document).ready(function() {
  $("button[type=button]").click(function(event) {
    event.preventDefault();
    login();
    return false;
  });
  $("input").keypress(function (e) {
    if(e.key === "Enter"){
      login();
      return false;
    }
  })
});
