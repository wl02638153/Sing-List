 
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        console.log("onDeviceReady!!");
    }
 
    $(document).ready(function (e) {
      var strurl=window.localStorage.URL+"/api/singer/";
      $.getJSON( strurl ,function(json){
          $.each(json, function(key, val) {
              console.log("name=="+val.name);
              var str='<option value=\"'+val.name+'\">'+val.name+'</option>';
              $('#select_singer').append(str).selectmenu("refresh");
          });
      });
        strurl=window.localStorage.URL+"/api/language/";
      $.getJSON( strurl ,function(json){
          $.each(json, function(key, val) {
              console.log("name=="+val.name);
              var str='<option value=\"'+val.name+'\">'+val.name+'</option>';
              $('#select_language').append(str).selectmenu("refresh");
          });
      });  

      $("#uploadForm_singer").on('submit',(function(e) {
        e.preventDefault();
        var form=document.getElementById("uploadForm_singer");
        form.setAttribute("action",window.localStorage.URL+"/api/singer/");
        var fd = new FormData($(this));
        fd.append('singer_img', $('#img1')[0].files[0]);
        fd.append('name',$('#singer_singer_name').val());
        fd.append('group',$('#singer_group').val());
        console.log("fd=="+fd);
          $.ajax({
            url: window.localStorage.URL+"/api/singer/",
            type: "POST",
            enctype: 'multipart/form-data',
            data:  fd,
            contentType: false,
            cache: false,
            processData:false,
            dataType: "json",
            success: function(response){
                alert('上傳成功');
              console.log("上傳成功");
              location.href='upload_file.html';
            },
                error:function(xhr, ajaxOptions, thrownError){
                navigator.notification.alert('資料上傳失敗,'+'狀態:'+xhr.status,null,'警示!!','OK');
                navigator.notification.alert('資料上傳失敗,'+thrownError,null,'警示!!','OK');
            }        
          });
      }));

      $("#uploadForm_song").on('submit',(function(e) {
        e.preventDefault();
        var form=document.getElementById("uploadForm_song");
        form.setAttribute("action",window.localStorage.URL+"/api/music/");
        var fd = new FormData($(this));
        fd.append('pic_url', $('#img2')[0].files[0]);
        fd.append('song',$('#song_song_name').val());
        console.log("song_song_name=="+$('#song_song_name').val());
        fd.append('singer',$('#select_singer').val());
        console.log("select_singer=="+$('#select_singer').val());
        fd.append('language',$('#select_language').val());
        console.log("select_language=="+$('#select_language').val());
        fd.append('video_url',$('#song_song_url').val());
        console.log("song_song_url=="+$('#song_song_url').val());
          $.ajax({
            url: window.localStorage.URL+"/api/music/",
            type: "POST",
            enctype: 'multipart/form-data',
            data:  fd,
            contentType: false,
            cache: false,
            processData:false,
            dataType: "json",
            success: function(response){
                alert('上傳成功');
              console.log("上傳成功");
              location.href='upload_file.html';
            },
                error:function(xhr, ajaxOptions, thrownError){
                navigator.notification.alert('資料上傳失敗,'+'狀態:'+xhr.status,null,'警示!!','OK');
                navigator.notification.alert('資料上傳失敗,'+thrownError,null,'警示!!','OK');
            }        
          });
      }));
    }); 
    

    function song_toggle(){
      $("#uploadForm_singer").attr("hidden",true);
      $("#uploadForm_song").removeAttr("hidden");
    }
    function singer_toggle(){
      $("#uploadForm_singer").removeAttr("hidden");
      $("#uploadForm_song").attr("hidden",true);
    }