
    
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        console.log("onDeviceReady!!");
        append_song_item();
    }

    function append_song_item(){
        var strurl=window.localStorage.URL+"/api/music/"+window.localStorage.song_item_click+"/";
        console.log("URL="+strurl);
        var str="";
        
        $.getJSON( strurl ,function(json){
            str+='<div align=\"center\">';
            
            if(json.video_url.includes('https://youtu.be')){
                str+='<iframe src="https://www.youtube.com/embed/'+json.video_url.replace("https://youtu.be/","")+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            }else if(json.video_url.includes('https://www.youtube.com')){
                str+='<iframe src="https://www.youtube.com/embed/'+json.video_url.replace("https://www.youtube.com/watch?v=","")+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            }else{
                str+='    <video controls=\"controls\">';
                str+='      <source src=\"'+window.localStorage.URL+json.video_url+'\" type="video/mp4">';
                str+='    Your browser does not support the video tag.';
                str+='    </video>';
            }
            str+='</div> ';
            $('#main_content').append(str).trigger("create");;
        });
    }

    