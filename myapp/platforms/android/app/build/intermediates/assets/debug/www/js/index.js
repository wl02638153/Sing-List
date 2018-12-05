
    function onLoaded(){
        window.localStorage.URL='http://192.168.1.100:8000';
        console.log('==============url==============' + window.localStorage.URL);
    }
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        console.log("onDeviceReady!!");
        refresh_login_token();
        append_song_list();
        append_singer_list();
    }
    function refresh_login_token(){
        // var form = document.createElement("form");
        // form.setAttribute("action",window.localStorage.URL+"/api-token-refresh/");
        var fd = new FormData($(this));
        fd.append('token', window.localStorage.login_token);
        
          $.ajax({
            url: window.localStorage.URL+"/api-token-refresh/",
            type: "POST",
            enctype: 'multipart/form-data',
            data:  fd,
            contentType: false,
            cache: false,
            processData:false,
            dataType: "json",
            success: function(response){
                // console.log("token=="+response.token);
                window.localStorage.login_token=response.token;
                // alert('更新成功');
              // console.log("更新成功");
            },
                error:function(xhr, ajaxOptions, thrownError){
                // navigator.notification.alert('資料上傳失敗,'+'狀態:'+xhr.status,null,'警示!!','OK');
                // navigator.notification.alert('資料上傳失敗,'+thrownError,null,'警示!!','OK');
            }        
          });
    }
    function append_song_list(){
        var strurl=window.localStorage.URL+"/api/music/";
        var str="";
        $.ajaxSetup({
          headers : {
            'Authorization' : 'JWT '+window.localStorage.login_token
          },
          "error":function() { 
                alert("請登入");
                location.href='login.html';
            }
        });
        $.getJSON( strurl ,function(json){
            console.log("musicJSON=="+json);
            console.log("de=="+json.detail);
            $.each(json, function(key, val) {
                var str_append="";
                str_append+='    <li id='+val.id+' onclick=\"song_list_item_click(this.id)\"><a href=\"#\">';
                str_append+='        <img src=\"'+val.pic_url.replace("/api/music","")+'\">';
                console.log("url==="+val.pic_url.replace("/api/music",""));
                str_append+='    <h2>'+val.song+'</h2>';
                str_append+='    <p>'+val.singer+'</p></a>';
                str_append+='    </li> ';
                $('#song_list').append(str_append).listview('refresh');
            });
        });
    }
    function append_singer_list(){
        $.ajaxSetup({
          headers : {
            'Authorization' : 'JWT '+window.localStorage.login_token
          },
          "error":function() { 
                // alert("請登入");
                // location.href='login.html';
            }
        });
        var strurl=window.localStorage.URL+"/api/singer/";
        var str="";
        $.getJSON( strurl ,function(json){
            console.log("singerJSON=="+json);
            $.each(json, function(key, val) {
                var str_append="";
                str_append+='    <li id='+val.id+' onclick=\"singer_list_item_click(this.id)\"><a href=\"#\">';
                str_append+='        <img src=\"'+val.singer_img.replace("/api/singer","")+'\">';
                str_append+='    <h2>'+val.name+'</h2>';
                str_append+='    <p>團體:'+val.group+'</p></a>';
                str_append+='    </li> ';
                $('#singer_list').append(str_append).listview('refresh');
            });
        });
    }

    function song_list_item_click(id){
        console.log("song_item_click!!"+id);
        window.localStorage.song_item_click=id;
        location.href='song_item.html';
    }
    function singer_list_item_click(id){
        console.log("singer_item_click!!"+id);
        window.localStorage.singer_item_click=id;
        console.log("singer_item_click=="+window.localStorage.singer_item_click);
        location.href='singer_item.html';
    }

    function upload_file_click(){
        // console.log("item_click!!"+id);
        // window.localStorage.song_item_click=id;
        location.href='upload_file.html';
    }

    function song_toggle(){
      $("#singer_list").attr("hidden",true);
      $("#song_list").removeAttr("hidden");
    }
    function singer_toggle(){
      $("#singer_list").removeAttr("hidden");
      $("#song_list").attr("hidden",true);
    }