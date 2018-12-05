
    function onLoaded(){

    }
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        console.log("onDeviceReady!!");
        // login();
    }
    $(document).ready(function (e) {
      $("#login_username").val(window.localStorage.login_username);
      $("#login_password").val(window.localStorage.login_password);
      $("#login_form").on('submit',(function(e) {
        e.preventDefault();
        window.localStorage.login_username=$("#login_username").val();
        window.localStorage.login_password=$("#login_password").val();
        var form=document.getElementById("login_form");
        form.setAttribute("action",window.localStorage.URL+"/api-token-auth/");
        var fd = new FormData($(this));
        fd.append('username',$('#login_username').val());
        fd.append('password',$('#login_password').val());
        console.log("fd=="+fd);
          $.ajax({
            url: window.localStorage.URL+"/api-token-auth/",
            type: "POST",
            enctype: 'multipart/form-data',
            data:  fd,
            contentType: false,
            cache: false,
            processData:false,
            dataType: "json",
            success: function(response){
                console.log("token=="+response.token);
                window.localStorage.login_token=response.token;
                alert('登入成功');
              console.log("登入成功");
              location.href='index.html';
            },
                error:function(xhr, ajaxOptions, thrownError){
                navigator.notification.alert('資料上傳失敗,'+'狀態:'+xhr.status,null,'警示!!','OK');
                navigator.notification.alert('資料上傳失敗,'+thrownError,null,'警示!!','OK');
            }        
          });
      }));
    }); 

    // function login(){
        // var form=document.getElementById("login");
        // form.setAttribute("action",window.localStorage.URL+"/api-token-auth/");
        // var strurl= window.localStorage.URL+"/api-token-auth/";
        // var fd = new FormData($(this));
        // fd.append('username',$('#login_username').val());
        // fd.append('password',$('#login_password').val());
        // console.log("fd=="+fd);
        // $.ajax({
          // url: window.localStorage.URL+"/api-token-auth/",
          // type: "POST",
          // enctype: 'multipart/form-data',
          // data:  fd,
          // contentType: false,
          // cache: false,
          // processData:false,
          // dataType: "json",
          // success: function(response){
              // alert('上傳成功');
            // console.log("上傳成功");
            // location.href='upload_file.html';
          // },
              // error:function(xhr, ajaxOptions, thrownError){
              // navigator.notification.alert('資料上傳失敗,'+'狀態:'+xhr.status,null,'警示!!','OK');
              // navigator.notification.alert('資料上傳失敗,'+thrownError,null,'警示!!','OK');
          // }        
        // });
    // }
