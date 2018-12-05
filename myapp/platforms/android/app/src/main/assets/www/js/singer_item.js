
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        console.log("onDeviceReady!!");
        append_singer_song_list();
    }

    function append_singer_song_list(){
        var strurl=window.localStorage.URL+"/api/singer/"+window.localStorage.singer_item_click+"/";
        console.log("strurl=="+strurl);
        $.getJSON( strurl ,function(json){
            console.log("json.id="+json.id);
            console.log("json.name="+json.name);
            console.log("json.group="+json.group);
            console.log("json.singer_img="+json.singer_img);

            var str_append="";
                str_append+='    <li id='+json.id+'>';
                str_append+='        <img src=\"'+json.singer_img.replace("api/singer/"+json.id+"/","")+'\">';
                console.log("666="+json.singer_img.replace("/api/singer/"+json.id+"/",""));
                str_append+='    <h2>'+json.name+'</h2>';
                str_append+='    <p>團體:'+json.group+'</p>';
                str_append+='    </li> ';
                $('#singer_list').append(str_append).listview('refresh');

            $.each(json.songs, function(index, val) {
                console.log("index=="+index);
                console.log("song=="+val.song);
                console.log("singer=="+val.singer);
                console.log("language=="+val.language);
                console.log("pic_url=="+val.pic_url);
                console.log("video_url=="+val.video_url);
                var str_append="";
                str_append+='    <li id='+val.id+' onclick=\"song_list_item_click(this.id)\"><a href=\"#\">';
                str_append+='        <img src=\"'+val.pic_url.replace("api/singer/"+json.id+"/","")+'\">';
                console.log("url==="+val.pic_url.replace("/api/music",""));
                str_append+='    <h2>'+val.song+'</h2>';
                str_append+='    <p>'+val.singer+'</p></a>';
                str_append+='    </li> ';
                $('#song_list').append(str_append).listview('refresh');

            });
        });
    }

    function song_list_item_click(id){
        console.log("song_item_click!!"+id);
        window.localStorage.song_item_click=id;
        location.href='song_item.html';
    }