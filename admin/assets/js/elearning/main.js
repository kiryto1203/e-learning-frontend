//const
const host = "http://localhost:9000";
const reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reg_phone = /^[0]{1}[1,9]{1}[0-9]{8,9}$/;
const notify_title = ['Primary notice','Danger notice','Success notify','Warning notify','Info notify'];
const notify = ['info','error','success','error',''];
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
  "list-question": "/admin/list-question.html",
  "listUser": "/admin/list-users.html",
}
const api = {
  "login": `${host}/api/v1/login`,
  "loadalluser": `${host}/api/v1/users`,
  "categories": `${host}/api/v1/categories`,
  "answers": `${host}/api/v1/answers-bank`,
  "questions": `${host}/api/v1/questions`,
  "questionBank": `${host}/api/v1/questions-bank`,
  "users": `${host}/api/v1/users`,
  "changeRole": `${host}/api/v1/users/change-role`,
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
    ajaxGetPromise: function(url,data=""){
      return new Promise((resolve, reject)=>{
        $.ajax({
          "xhrFields": {
            withCredentials: true
          },
          "headers": {
            'Authorization': localStorage.getItem('bear'),
          },
          "url": url,
          "type": "GET",
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
          reject(new failed(xhr,status,error));
        });
      })
    },
    ajaxPostPromise: function(url,data){
      return new Promise((resolve, reject)=>{
        $.ajax({
          "xhrFields": {
            withCredentials: true
          },
          "headers": {
            'Authorization': localStorage.getItem('bear'),
            'Content-Type': "application/json"
          },
          "url": url,
          "type": "POST",
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
          reject(new failed(xhr,status,error));
        });
      })
    },
    ajaxPutPromise: function(url,data){
      return new Promise((resolve, reject)=>{
        $.ajax({
          "xhrFields": {
            withCredentials: true
          },
          "headers": {
            'Authorization': localStorage.getItem('bear'),
            'Content-Type': "application/json"
          },
          "url": url,
          "type": "PUT",
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
          reject(new failed(xhr,status,error));
        });
      })
    },
    ajaxDeletePromise: function(url,data){
      return new Promise((resolve, reject)=>{
        $.ajax({
          "xhrFields": {
            withCredentials: true
          },
          "headers": {
            'Authorization': localStorage.getItem('bear')
          },
          "url": url,
          "type": "DELETE",
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
          reject(new failed(xhr,status,error));
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
          main.notify("Link not found",1);
          break;
        case "401":
          main.notify("You are unauthorized to access.",1);
          break;
        case "403":
          main.notify("You are unauthenticated to access.",1);
          break;
        case "200":
          main.notify("Success.",2);
          break;
        case "050":
          main.notify("Username and password is not empty",1);
          break;
        case "051":
        case "052":
          main.notify("The session has expired, you will logout.",1);
          setTimeout(()=>{ main.navigate("login"); },3000);
          break;
        case "005":
          main.notify(`Field input missing: ${main.formatFieldInputMissing(message)}`);
          break;
        case "101":
          main.notify("Question parent not exists. Please contact with develop team.");
          break;
        case "104":
          main.notify("Some quetions have too less answers.Total anwsers in a question must than 2.",1);
          break;
        case "102":
          main.notify("Add question error.Please contact with develop team.");
          break;
        case "100":
          main.notify("Some quetions don't have correct answers.Question must have minimum a correct answers",1);
          break;
        case "999":
          main.notify("Fail unrecognized error.",1);
          break;
        case "004":
          console.log(1);
          main.notify("Username or password not match",1);
          break;
        case "888":
          main.notify("You can't delete yourself.",1);
          break;
        case "666":
          main.notify("You can't change administrator user role",1);
          break;
        default:
          main.notify("Fail unrecognized error.",1);
          break;
      }
    },
    notify: function(message="",type=0){
      new PNotify({
              title: notify_title[type],
              text: message,
              type: notify[type]
          });
    },
    confirm: function(text){
      return new Promise((resolve,reject)=>{
        (new PNotify({
                    title: "Are you sure?",
                    text: text,
                    icon: 'glyphicon glyphicon-question-sign',
                    hide: false,
                    confirm: {
                        confirm: true
                    },
                    buttons: {
                        closer: false,
                        sticker: false
                    },
                    history: {
                        history: false
                    },
                    addclass: 'stack-modal',
                    stack: {'dir1': 'down', 'dir2': 'right', 'modal': true},
                })).get().on('pnotify.confirm', function(){
                    resolve();
                }).on('pnotify.cancel', function(){
                    reject();
                })
      })
    },
    prompt: function(title,text,callback,callbackResult){
      return new Promise((resolve,reject)=>{
        (new PNotify({
              title: title,
              text: text,
              icon: 'glyphicon glyphicon-question-sign',
              hide: false,
              confirm: {
                  prompt: true
              },
              buttons: {
                  closer: false,
                  sticker: false
              },
              history: {
                  history: false
              }
          })).get().on('pnotify.confirm', function(e, notice, val) {
              callbackResult();
              resolve(val);
          }).on('pnotify.cancel', function(e, notice) {
              reject(e);
          });
          callback();
      })
    },
    showInfo: function(title,text,type){
      PNotify.prototype.options.delay = 400000000;
      var opts = {
        title: title,
        text: text,
        addclass: "stack-modal",
        stack: {"dir1": "down", "dir2": "right", "push": "top", "modal": true, "overlay_close": true},
        type: type
      };
      new PNotify(opts);
      PNotify.prototype.options.delay = 4000;
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
        console.log(err);
        //main.navigate("login");
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
    isValid: function(e){
      if(!e || e==="undefined") return false;
      return true;
    },
    formatFieldInputMissing: function(a){
      return a.substring(a.indexOf('[')+1,a.length-2);
    },
    setupTable: function(){
      $.extend( $.fn.dataTable.defaults, {
        autoWidth: false,
        columnDefs: [{
            orderable: false,
            width: '100px',
            targets: [ 5 ]
        }],
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
      });
      $('.datatable-api tfoot td').not(':last-child').each(function () {
          var title = $('.datatable-api thead th').eq($(this).index()).text();
          $(this).html('<input type="text" class="form-control input-sm" placeholder="Search '+title+'" />');
      });
      var table = $('.datatable-api').DataTable({
        rowReorder: {
              selector: 'td:nth-child(2)'
          },
          responsive: true
      });
      table.columns().every( function () {
          var that = this;
          $('input', this.footer()).on('keyup change', function () {
              that.search(this.value).draw();
          });
      });
      $('input[type=search]').attr('placeholder','Type to filter...');
      $('select').select2({
          minimumResultsForSearch: Infinity,
          width: 'auto'
      });
    },
    getParameterURL: function(a){
        let c = [];
        let b = window.location.search.substring(1).split('&');
        b.forEach(w => c.push({ "key": w.split('=')[0], "value": w.split('=')[1] }));
        return c.find(w => w.key === a).value;
    },
    formatDateString(a){
      if(!main.isValid(a)) return "N/A";
      return `${main.formatOneCharDate(a.getHours())}:${main.formatOneCharDate(a.getMinutes())} ${main.formatOneCharDate(a.getDate())}/${main.formatOneCharDate(a.getMonth()+1)}/${main.formatOneCharDate(a.getFullYear())}`
    },
    formatOneCharDate(a){
      return a.toString().length == 1 ? `0${a}` : a;
    },
    formatTH(status){
      switch (status) {
        case 0:
          return `<span class="label label-default">Not ativated</span>`;
          break;
        case 1:
          return `<span class="label label-success">Activated</span>`;
          break;
        default:
          return `<span class="label label-danger">Blocked</span>`;
          break;
      }
    },
    renderSelectRole: function(e=0){
      let list = `<select class="form-control">`;
      role.forEach(v => {
        if(v[0]==e)
          list += `<option value="${v[0]}" selected>${v[1]}</option>`;
        else
          list += `<option value="${v[0]}" >${v[1]}</option>`;
      });
      list += "</select>";
      return list;
    },
    format: function(a){
      return a || "N/A"
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
  $("#clear-data").click(function(event) {
    let local = Object.keys(localStorage)
    for (let i = 0,size=local.length; i < size; i++) {
      if(local[i]!="bear")
        localStorage.removeItem(local[i]);
    }
    location.reload();
  });
  $("a").click(function(event) {
    let href = $(this).attr('href');
    switch (href) {
      case "/admin/add-user.html":
      case "/admin/list-users.html":
        if(currentUser.role!=="0"){
          main.handleResult("403");
          return false;
        }
        break;
      break;
      default:

    }
  });
})
$(window).on('scroll', function () {
  try {
    if(typeof $('.fix-scroll').parent().offset() !== "undefined"){
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
    }
  } catch (err) {
    console.log(err);
  }

});
