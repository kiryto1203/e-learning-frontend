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
  main.ajaxPromise(api.login,"POST",data)
  .then((rs) => {
    console.log(rs);
    if(!rs.code && rs.status==="success"){
      localStorage.setItem('bear',rs.data);
      main.endProcess(".login-form");
      setTimeout(function () {
        main.notify("Login success.",2);
        main.navigate();
      });
    }else{
      main.handleResult(rs.code);
    }
  },(rs)=>{
    main.endProcess(".login-form");
  })
}
function clear(){
  $("input[name=username]").val("");
  $("input[name=password]").val("");
}
$(document).ready(function() {
  $("button[type=button]").click(function(event) {
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
