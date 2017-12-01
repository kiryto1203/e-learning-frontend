//const
const host = "http://localhost:9000";
const reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reg_phone = /^[0]{1}[1,9]{1}[0-9]{8,9}$/;
const notify_title = ['Primary notice','Danger notice','Success notify','Warning notify','Info notify'];
const notify = ['bg-primary','bg-danger','bg-success','bg-warning','bg-info'];
const role = [
  [0 , "Administrator"],
  [1 , "Manager"],
  [2 , "Teacher"],
  [3 , "Contributer"],
  [4 , "User"]
];
const questionType = new Map();
questionType.set(1,"One Choose");
questionType.set(2,"Multiple Choose");
questionType.set(3,"Paragraph");
questionType.set(4,"Enter Answer");
const whitespaceAnswer = /[_][(]\d[)][_]/g;
// source
const link = {
  "": "/admin",
  "/": "/admin/index.html",
  "index": "/admin/index.html",
  "login" : "/admin/login.html",
  "add-question": "/admin/add-question.html",
}
const api = {
  "login": `${host}/api/v1/login`,
  "loadalluser": `${host}/api/v1/users`,
  "categories": `${host}/api/v1/categories`,
  "answers": `${host}/api/v1/answers-bank`,
}
//entity
class CurrentUser{
  constructor(username,displayName,email,phone,address,avatar,role){
    this.username = username || "";
    this.displayName = displayName || "",
    this.email = email || "",
    this.phone = phone || "",
    this.address = address || "",
    this.avatar = avatar || "",
    this.role = role || ""
  }
}
class failed{
  constructor(xhr,status,error){
    this.xhr = xhr,
    this.status = status,
    this.error = error
  }
}
class success{
  constructor(data,status,xhr){
    this.data = data,
    this.status = status,
    this.xhr = xhr
  }
}
//end entity
// end source
let currentUser = new CurrentUser();
var main = {
    now: new Date(),
    navigate: function(location = "") {
      window.location.href = link[location];
    },
    ajaxPromise: function(url,method="GET",data=""){
      return new Promise((resolve, reject)=>{
        $.ajax({
          "xhrFields": {
            withCredentials: true
          },
          "headers": {
            'Authorization': localStorage.getItem('bear')
          },
          "url": url,
          "type": method,
          "data": data,
        })
        .done(function(data,status,xhr) {
          try {
            data = JSON.parse(data);
            if(data.code){
              main.handleResult(data.code);
            }
          } catch (err) {}
          resolve(new success(data,status,xhr));
        })
        .fail(function(xhr,status,error) {
          reject(new fail(xhr,status,error));
        });
      })
    },
    startProcess: function(selector){
      $(selector).block({
            message: '<i class="icon-sync spinner"></i>',
            overlayCSS: {
                backgroundColor: '#1B2024',
                opacity: 0.85,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none',
                color: '#fff'
            }
        });
    },
    endProcess: function(selector){
      $(selector).unblock();
    },
    handleResult: function(code, message = ""){
      switch (code) {
        case "404":
          main.notify("Link not found",5);
          break;
        case "401":
          main.notify("You are unauthorized to access.",4);
          break;
        case "403":
          main.notify("You are unauthenticated to access.",4);
          break;
        case "200":
          main.notify("Success.",4);
          break;
        case "050":
          main.notify("Username and password is not empty",4);
        case "051":
        case "052":
          main.notify("The session has expired, you will logout.",4);
          setTimeout(()=>{ main.navigate("login"); },3000);
        default:
          break;
      }
    },
    notify: function(message="",type=5){
      new PNotify({
              title: notify_title[type],
              text: message,
              addclass: notify[type]
          });
    },
    setRole: function(){
      try {
        // console.log(role);
        // let temp = "",
        // role.forEach((v,k)=>{
        //   temp += `<option value="${v[0]}">${v[1]}</option>`;
        // })
        // $("select[name=role]").html(temp);
      } catch (err) {
        console.log(err);
      }
    },
    setCurrentUser: function(){
      try {
        var decoded = jwt_decode(localStorage.getItem('bear'));
        let a = Object.values(decoded);
        currentUser.username = a[2];
        currentUser.role = a[3];
        currentUser.email = a[4];
        currentUser.address = a[5];
        currentUser.phone = a[6];
        currentUser.avatar = a[7];
        currentUser.displayName = a[8];
      } catch (err) {
        main.navigate("login");
      }
    },
    formatStringArray: function(object){
      object = object.substring(1,object.length-1);
      let array = object.split('},{');
      let rs = [];
      array.forEach(e => {
        rs.push(JSON.parse(`${e}}`));
      });
      return rs;
    },
    innerTextHTML: function (a) {
        let div = document.createElement('div');
        div.innerHTML = a;
        return div.innerText || "";
    },
    guid: function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
}

// runtime
$(document).ready(function(){
  if(window.location.pathname!=="/admin/login.html"){
    main.setCurrentUser();
    $(".img-user").attr("src", host+currentUser.avatar);
    $(".displayname-user").html(currentUser.displayName);
    $(".role-user").html(`<i class="icon-user-check"></i>&nbsp&nbsp&nbsp${role[currentUser.role][1]}`);
  }
})
$(window).on('scroll', function () {
  try {
    var scrollTop     = $(window).scrollTop(),
        elementOffset = $('.fix-scroll').parent().offset().top,
        distance      = (elementOffset - scrollTop);
    if(distance < 10){
      $(".fix-scroll").css("position","fixed");
      $(".fix-scroll").css("top","10px");
      $(".fix-scroll").css("left",`${$('.fix-scroll').offset().left}px`);
    }
    else{
      $(".fix-scroll").removeAttr('style');
    }
  } catch (err) {
    console.log(err);
  }

});
